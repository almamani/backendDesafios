// Configuracion Mongo - Atlas con variables de entorno
DB_USER=user
DB_PASS=pass

//Uso en la configuarcion
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds241658.mlab.com:41658/test_db`,
(err)=>{if(err) throw err;
    console.log("DB Connected Successfully");
})

