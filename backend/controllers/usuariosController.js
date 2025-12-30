const Usuarios = require('../models/usuarios.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsuario = async (req, res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar users: ", error);
        res.status(500).json({ message: 'Erro ao buscar users' });
    }
};

const cadastra = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.json('Insira todas as informações');
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUser = new Usuarios({
            nome: nome,
            email: email,
            senha: hashedPassword
        });

        await novoUser.save();
        res.status(201).json(novoUser);
        console.log('Usuário cadastrado');
    } catch (error) {
        console.error('Erro ao criar usuário: ', error);
        res.status(500).json('Erro ao criar usuário: ', error);
    }
};

const verifica = async (req, res) => {
    const { email, senha } = req.body;

    // Verifica se os campos foram fornecidos
    if (!email || !senha) {
        return res.status(400).json({ message: "Por favor, forneça email e senha" });
    }

    try {
        const user = await Usuarios.findOne({ email: email });

        if (!user) {
            throw { type: 'verification', message: 'Usuário não encontrado' };
        }

        const valid = await bcrypt.compare(senha, user.senha);

        if (!valid) {
            throw { type: 'verification', message: 'Login inválido' };
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, nome: user.nome },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        return res.status(200).json({ success: true, message: "Login bem-sucedido", token: token });
    } catch (error) {
        console.error("Erro ao verificar usuário: ", error);
        return res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};


module.exports = { getUsuario, cadastra, verifica };