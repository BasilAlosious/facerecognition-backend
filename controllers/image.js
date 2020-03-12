const clarifai= require('clarifai');

const app = new Clarifai.App({
 apiKey: 'adf43665c0564555aaf29d2e515bebbc'
});
const handleApicall =(req,res)=>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))	
}
const handleImage =(req,res,db)=>{
	const{id}=req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries=>{
		return res.json(entries);
	})
	.catch(err => res.status(400).json('unable to get entries'))	
}
module.exports={
	handleImage,
	handleApicall
};