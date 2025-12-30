const Comments = require("../models/comment");

const GetComments = async (req, res) => {
    try {
        const { movieId } = req.params;
        const comments = await Comments.find({ movieId: movieId });
        res.json(comments);
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
        res.status(500).json({ error: 'Erro ao buscar comentários' });
    }
};

const CreateComment = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { comment, rating } = req.body;
        if (!comment || !rating) {
            return res.status(400).json({ error: 'Comentário e avaliação são obrigatórios' });
        }

        const author = req.user.nome;
        const likes = 0;
        const newComment = new Comments({ movieId, author, comment, likes, rating });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({ error: 'Erro ao criar comentário' });
    }
};

const LikeComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comments.findById(id);
        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        comment.likes += 1;
        await comment.save();
        res.json(comment);
    } catch (error) {
        console.error('Erro ao curtir comentário:', error);
        res.status(500).json({ error: 'Erro ao curtir comentário' });
    }
};

module.exports = { GetComments, CreateComment, LikeComment };
