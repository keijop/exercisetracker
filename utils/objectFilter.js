//takes obj and array as arguments
//returnes cloned obj with only desired properties (specified in the array argument)

const filter = (obj, arr) => {

  const filteredObj = {}

  for(const prop in obj){
    arr.forEach( desiredProp => {
      if (prop === desiredProp){
      filteredObj[desiredProp] = obj[prop]
      }
    })
  }
  return filteredObj
}

module.exports = filter