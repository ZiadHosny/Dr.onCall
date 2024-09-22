export class ApiFeature {
    mongooseQuery;
    queryString;
    page = 1;
    constructor(mongooseQuery, req) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = req.query;
    }
    paginate() {
        const { page } = this.queryString;
        let pageNumber = Number(page) * 1 || 1;
        if (pageNumber <= 0)
            pageNumber = 1;
        let skip = (pageNumber - 1) * 5;
        this.page = pageNumber;
        this.mongooseQuery.skip(skip).limit(5);
        return this;
    }
    // filter() {
    //   let filterObj = { ...this.queryString };
    //   const excludedQuery = ['page', 'sort', 'fields', 'keyword'];
    //   excludedQuery.forEach((q) => {
    //     delete filterObj[q];
    //   });
    //   let filterObjJson = JSON.stringify(filterObj);
    //   filterObjJson = filterObjJson.replace(
    //     /\b(gt|gte|lt|lte)\b/g,
    //     (match) => `$${match}`,
    //   );
    //   filterObj = JSON.parse(filterObjJson);
    //   this.mongooseQuery.find(filterObj);
    //   return this;
    // }
    sort() {
        const sort = this.queryString.sort;
        if (sort) {
            const sortedBy = sort.split(',').join('.');
            this.mongooseQuery.sort(sortedBy);
        }
        return this;
    }
    search() {
        const { keyword } = this.queryString;
        if (keyword) {
            this.mongooseQuery.find({
                $or: [
                    {
                        name: { $regex: keyword, $options: 'i' },
                        // description: { $regex: keyword, $options: 'i' }
                    },
                ],
            });
        }
        return this;
    }
    fields() {
        const fields = this.queryString.fields;
        if (fields) {
            const select = fields.split(',').join(' ');
            this.mongooseQuery.select(select);
        }
        return this;
    }
}
