const info = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
      console.log(...params)
    }

  }
  
  const error = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error("prööt")
    }
  }
  
  module.exports = {
    info, error
  }