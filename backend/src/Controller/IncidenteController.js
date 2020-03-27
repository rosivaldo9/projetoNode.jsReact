const connection = require('../database/connection');

module.exports={

    async index(request, response){
        const {page=1} = request.query;

        const [count]=await connection('incidentes').count();

        response.header('X-total-Count', count['count(*)']);

        console.log(count);

        const incidentes=await connection('incidentes')
        .join('ongs', 'ongs.id', '=', 'ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select([
         'incidentes.*',
         'ongs.name', 
         'ongs.email', 
         'ongs.whatsapp', 
         'ongs.city', 
         'ongs.uf'
        ]);
        return response.json(incidentes);
    },

    async create(request, response){
   const { title, description, value }= request.body;
   const ong_id = request.headers.authorization;
  const [id] = await connection('incidentes').insert({
       title,
       description,
       value,
       ong_id,
   });

   return response.json({id});
},

async delete(request, response){
    const { id }= request.params;
    const ong_id = request.headers.authorization;

    const incidents = await connection('incidentes')
    .where('id', id)
    .select('ong_id')
    .first();

   if(incidents.ong_id != ong_id){
       return response.status(401).json({error: 'erro ao executar'});
   }
    await connection('incidentes').where('id', id).delete();

    return response.status(204).send();
}

};