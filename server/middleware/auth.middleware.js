import jwt from 'jsonwebtoken'

const auth = async(req , res , next)=> {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isCustomAuth = token.length < 500 // if length is les than 500 , its our generated token , but if its greater than 500 , it belongs to google

        let decodedData;

        if (token && isCustomAuth){
            decodedData = jwt.verify(token , 'test')

            res.userId = decodedData?.id
        }else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }

            next()
    } catch (error) {
        console.log(error)
    }
}


export default auth;