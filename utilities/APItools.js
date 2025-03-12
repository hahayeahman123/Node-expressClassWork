class APIFeatures {
    constructor(query, queryString){ // remember constructors? yeah
        this.query = query;
        this.queryString = queryString;
    }
    filter(){ //in postman, we use '(insert the field we want to filter by)' and we add '(gte,gt,lte,lt)'    to get this
        const queryObj = {...this.queryString};
        const excludedField = ['page', 'sort', 'limit', 'fields'];
        excludedField.forEach(el=> {delete queryObj[el]});

        let queryString = JSON.stringify(queryObj);

        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match=>`$${match}`);

        this.query = this.query.find(JSON.parse(queryString));


        return this
    }
    sort(){
        if(this.queryString.sort){ //in postman, we use 'sort' to get this
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy + ' _id');
        }else{
            this.query = this.query.sort('-createdAt _id');
        }
        return this
    }
    limitFields(){
        if(this.queryString.fields){ //in postman, we use 'fields' to get this, this is supposed to give us very specific fields we want
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }
        return this
    }
    paginate(){ // we use 'page=(which page)' and 'limit=(how many entries per page)' to get this
        const page = parseInt(this.queryString.page) || 1
        const limit = parseInt(this.queryString.limit) || 2
        const skip = (page-1)*limit;

        this.query = this.query.skip(skip).limit(limit)
        return this
    }
}

module.exports = APIFeatures