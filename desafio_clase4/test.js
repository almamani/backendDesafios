const Contenedor = require("./claseContenedor.js");

const test = async () => {

    try {
        const productArte = new Contenedor("productos.txt");
    
        await productArte.getAll();    
                
        await productArte.save(
            "Alfombra Frise",
            1200,
            "https://i.postimg.cc/gkQgFzbP/alfombra3.png"
        );
        
        await productArte.getAll();  
        
        await productArte.getById(2); 
    
        await productArte.deleteById(2);
        
        await productArte.getById(2); 
           
        await productArte.deleteAll(); 
    
        await productArte.getAll();  

    } catch (err) {
        console.log(err);
    }
    
}

test();