const mongoose = require('mongoose')
const slugify = require('slugify')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true
    },
    slug: String,
    duration:{
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price: {
        type: String,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary:{
        type: String,
        trim: true,
        required: [true, 'A tour must have a summury']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a image cover ']
    },
    images: [String],
    createAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})

// document middleware: run before .save() and .create()
tourSchema.pre('save', function(next){
    
    this.slug = slugify(this.name, {lower: true})

    next()
})

// tourSchema.pre('save', function(next){

//     console.log('will save........')

//     next()
// })

// tourSchema.post('save', function(doc, next){

//     console.log(doc)

//     next()
// })

tourSchema.pre(/^find/, function(next){
    // tourSchema.pre('find', function(next){

    this.find({ secretTour: {$ne: true} })

    next()

})

// aggregation middleware

tourSchema.pre('aggregate', function(next){

    console.log('before aggregate')

    console.log(this.pipeline())

    next()
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour