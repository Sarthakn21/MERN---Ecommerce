class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword
            ? {
                name: {
                    $regex: this.queryStr.keyword, //simply does the work of find() but with extras also
                    $options: "i", //to make it case insensitive
                },
            }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        const categoryFilter = {};
        if (queryCopy.mainCategory) {
            categoryFilter['category.main'] = queryCopy.mainCategory.trim().toLowerCase();
            delete queryCopy.mainCategory;
        }
        if (queryCopy.subCategory) {
            categoryFilter['category.sub'] = queryCopy.subCategory.trim().toLowerCase();
            delete queryCopy.subCategory;
        }

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        const parsedQuery = JSON.parse(queryStr);
        this.query = this.query.find({ ...categoryFilter, ...parsedQuery });

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = this.queryStr.page || 1;

        const skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}
export { ApiFeatures };