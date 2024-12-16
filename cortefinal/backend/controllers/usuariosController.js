const Usuarios = require('../models/usuarios.js');

const getUsuario = async (req,res) => {
    try {
        const usuarios = await Usuarios.find();
        res.json(usuarios);
    } catch (error) {
        console.error("Erro ao buscar filmes: ", error);
        res.status(500).json({message: 'Erro ao buscar filmes'});
    }
};

const cadastra = async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        res.json('Insira todas as informações');
    }

    try {
        const novoUser = new Usuarios({
            nome: nome,
            email: email,
            senha: senha
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

        if (user) {
            // Verifica se a senha está correta
            if (user.senha === senha) {
                console.log("Usuário autenticado com sucesso!");
                return res.status(200).json({ success: true, message: "Login bem-sucedido" });
            } else {
                console.log("Usuário ou senha incorretos");
                return res.status(401).json({ success: false, message: "Senha incorreta" });
            }
        } else {
            console.log("Usuário não encontrado");
            return res.status(404).json({ success: false, message: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Erro ao verificar usuário: ", error);
        return res.status(500).json({ success: false, message: "Erro no servidor" });
    }
};


module.exports = { getUsuario, cadastra, verifica };