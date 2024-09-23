const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 8086;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Usa CORS en tu servidor

// URI de conexión a MongoDB
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Conectar a MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Conectado a MongoDB');
    } catch (e) {
        console.error('Error al conectar a MongoDB:', e.message);
    }
}

connectToMongoDB();

const db = client.db('CoinKeeper');
const collection = db.collection('PerfilDeUsuario');

// Endpoint para registro
app.post('/register', async (req, res) => {
    console.log('Datos recibidos:', req.body);

    const { usuario, correo, edad, contrasena, telefono } = req.body;

    try {
        // Verificar si el correo ya está registrado en la base de datos
        const usuarioExistente = await collection.findOne({ Correo_Electronico: correo });

        if (usuarioExistente) {
            // Si ya existe un usuario con el correo, enviar un mensaje de error
            return res.status(400).send('El correo ya está en uso');
        }

        // Crear un nuevo usuario
        const nuevoUsuario = {
            Nombre: usuario,
            Correo_Electronico: correo,
            Edad: edad,
            Contraseña: contrasena,
            Verificacion: 'Pendiente',
            Bancos: [
                { nombre: "Bancolombia" },
                { nombre: "Banco Caja Social" },
                { nombre: "Banco Itaú" }
            ],
            Preferencia_De_Idioma: [
                { nombre: "Español" },
                { nombre: "Inglés" },
                { nombre: "Francés" }
            ],
            Preferencia_moneda: "COP",
            Telefono: telefono
        };

        console.log('Nuevo usuario antes de insertar:', nuevoUsuario);

        // Insertar el nuevo usuario en la base de datos
        const result = await collection.insertOne(nuevoUsuario);
        console.log('Usuario insertado:', result);

        // Responder con éxito
        res.status(201).send('Usuario registrado exitosamente');
    } catch (e) {
        console.error('Error al registrar usuario:', e.message);
        res.status(500).send('Error al registrar usuario');
    }
});

// Endpoint para inicio de sesión
app.post('/login', async (req, res) => {
    const { usuario, contrasena } = req.body; // Datos recibidos del frontend

    try {
        // Busca al usuario en la base de datos
        const usuarioEncontrado = await collection.findOne({
            $or: [
                { Correo_Electronico: usuario }
            ]
        });

        if (!usuarioEncontrado) {
            // Si el usuario no existe, devuelve un error
            return res.status(404).send('Correo no encontrado');
        }

        // Verifica la contraseña
        if (usuarioEncontrado.Contraseña === contrasena) {
            // Si la contraseña es correcta, devuelve un mensaje de éxito
            return res.status(200).send('Inicio de sesión exitoso');
        } else {
            // Si la contraseña es incorrecta, devuelve un error
            return res.status(401).send('Contraseña incorrecta');
        }
    } catch (e) {
        console.error('Error al buscar usuario:', e.message);
        return res.status(500).send('Error en el servidor');
    }
});


// Endpoint para actualizar perfil del usuario
app.put('/update-profile', async (req, res) => {
    try {
        const { nombre, edad, correo, telefono, preferencia_idiomas, preferencia_bancos, preferencia_moneda } = req.body;

        // Busca el usuario por correo electrónico
        const usuarioEncontrado = await collection.findOne({ Correo_Electronico: correo });

        // Verifica si el usuario existe
        if (!usuarioEncontrado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Prepara los campos a actualizar
        const updateFields = { 
            Nombre: nombre,
            Edad: edad,
            Telefono: telefono,
            Bancos: preferencia_bancos,
            Preferencia_De_Idioma: preferencia_idiomas,
            Preferencia_moneda: preferencia_moneda
        };

        // Actualiza el perfil
        await collection.updateOne(
            { Correo_Electronico: correo }, // Filtra por correo
            { $set: updateFields } // Usa $set para actualizar los campos
        );

        res.status(200).json({ message: 'Perfil actualizado exitosamente' });
    } catch (e) {
        console.error('Error al actualizar el perfil:', e.message);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});




// Obtener el perfil de usuario
app.get('/get-profile', async (req, res) => {
    console.log('Solicitud recibida para correo:', req.query.correo);
    try {
        // Busca por el campo correcto en tu base de datos
        const usuario = await collection.findOne({ Correo_Electronico: req.query.correo });
        console.log('Usuario encontrado:', usuario); // Verifica el usuario encontrado

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        
        // Enviar los datos del usuario encontrado
        res.json({
            nombre: usuario.Nombre,
            edad: usuario.Edad,
            correo: usuario.Correo_Electronico,
            telefono: usuario.Telefono,
            preferencia_idiomas: usuario.Preferencia_De_Idioma,
            preferencia_bancos: usuario.Bancos,
            preferencia_moneda: usuario.Preferencia_moneda
        });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ message: 'Error al obtener el perfil' });
    }
});


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});