export class ApiFeature {
    mongooseQuery;
    queryString;
    paginationInfo = {
        totalPages: 0,
        page: 0,
        limit: 0,
        totalLength: 0,
    };
    data = [];
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }
    sort() {
        const sort = this.queryString.sort?.split(',').join(' ');
        this.mongooseQuery.sort(sort);
        return this;
    }
    async paginate() {
        const { limit, page } = this.queryString;
        const pageNumber = page ? +page : 1;
        const limitNumber = limit ? +limit : 10;
        const countQuery = this.mongooseQuery.model.find({
            ...this.mongooseQuery.getQuery(),
        });
        const total = await countQuery.countDocuments();
        const totalPages = Math.ceil(total / limitNumber);
        const skip = ((pageNumber > totalPages ? totalPages : pageNumber) - 1) * limitNumber;
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limitNumber);
        this.paginationInfo = {
            totalPages,
            page: pageNumber > totalPages ? totalPages : pageNumber,
            limit: limitNumber,
            totalLength: total,
        };
        this.data = await this.mongooseQuery;
        return this;
    }
    filter() {
        let queryObj = { ...this.queryString };
        const excludedFields = [
            'sort',
            'limit',
            'page',
            'fields',
            'keyword',
            'populate',
        ];
        excludedFields.forEach((el) => delete queryObj[el]);
        let queryStr = JSON.stringify(excludedFields);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|eq|ne|in|nin)\b/g, (match) => `$${match}`);
        let parsedQueryString;
        if (queryStr.includes('$in')) {
            parsedQueryString = JSON.parse(queryStr);
            let splittedTypes = Array.from(parsedQueryString['type']['$in'].split(','));
            parsedQueryString['type']['$in'] = splittedTypes;
            queryStr = JSON.stringify(parsedQueryString);
        }
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
        return this;
    }
    search() {
        const { keyword } = this.queryString;
        if (keyword) {
            const keywordObj = {
                $or: Object.keys(keyword).map((key) => {
                    if (typeof keyword[key] === 'string') {
                        return {
                            [key]: { $regex: keyword[key], $options: 'i' },
                        };
                    }
                    const keys = keyword[key].map((value) => ({
                        [key]: { $regex: value, $options: 'i' },
                    }));
                    return { $or: keys };
                }),
            };
            this.mongooseQuery = this.mongooseQuery.find(keywordObj);
        }
        return this;
    }
    fields() {
        console.log(this.queryString);
        const select = this.queryString.fields?.split(',').join(' ') ?? '';
        this.mongooseQuery.select(select);
        return this;
    }
    populate() {
        const populate = this.queryString?.populate
            ?.split(',')
            .map((field) => field.trim());
        if (populate) {
            populate.forEach((field) => {
                this.mongooseQuery = this.mongooseQuery.populate(field);
            });
        }
        return this;
    }
}
