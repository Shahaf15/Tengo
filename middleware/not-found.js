const notFoundMiddleware = (req,res) => res.status(404).send('Route does not exsit')

export default notFoundMiddleware;