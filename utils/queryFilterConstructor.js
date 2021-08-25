const queryFilterConstructor = (username, reqQueryObj) => {
  
  const {to, from} = reqQueryObj

  let toExpression
  let fromExpression
  let expressionArray = []
  
  if(to){
    toExpression = { date : { $lte : to }}
    expressionArray.push(toExpression)
  }
  
  if(from){
    fromExpression = { date : { $gte : from }}
    expressionArray.push(fromExpression)
  }
  
  
  return { $and : [{username : username}, ...expressionArray] }

}

module.exports = queryFilterConstructor