/* eslint-disable no-unused-vars */
import { Document, Query } from 'mongoose';
import { IQuery } from './factory.js';

export type PaginationInfo = {
  totalPages: number;
  page: number;
  limit: number;
  totalLength: number;
};

export class ApiFeature<T extends Document> {
  paginationInfo: PaginationInfo = {
    totalPages: 0,
    page: 0,
    limit: 0,
    totalLength: 0,
  };
  data: T[] = [];

  constructor(
    public mongooseQuery: Query<T[], T>,
    public queryString: IQuery,
  ) {}

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

    const skip =
      ((pageNumber > totalPages ? totalPages : pageNumber) - 1) * limitNumber;
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
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|eq|ne|in|nin)\b/g,
      (match) => `$${match}`,
    );
    let parsedQueryString;
    if (queryStr.includes('$in')) {
      parsedQueryString = JSON.parse(queryStr);
      let splittedTypes = Array.from(
        parsedQueryString['type']['$in'].split(','),
      );

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
          const keys = (keyword[key] as unknown as [string]).map((value) => ({
            [key]: { $regex: value, $options: 'i' },
          }));
          return { $or: keys };
        }),
      } as any;

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
        this.mongooseQuery = this.mongooseQuery.populate(field) as Query<
          T[],
          T
        >;
      });
    }
    return this;
  }
}
