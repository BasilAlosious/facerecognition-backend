const handleProfile =(req,res,db)=>{
	const{id}=req.params;
	let found='false';
	db.select('*').from('users').where({id}).then(user => {
		if(user.length){
			return res.json(user[0])
		} else {
			return res.status(404).json('no such user');
		}
	})
		.catch(err => res.status(400).json('unable to find user'))		
}
module.exports={
	handleProfile:handleProfile
};