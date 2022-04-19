const database = require('../config/db');
require('dotenv').config();

// ----------------------- Créer un like ----------------------- //
exports.createLikes = (req, res) => {
  const { post_id, user_id, isLiked } = req.body;
  console.log(req);
  if (isLiked === 1) {
    database.query(
      'INSERT INTO `likes`(`post_id`, `user_id`, `isLiked`) VALUES (?, ?, ?)',
      [post_id, user_id, isLiked],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        res.status(201).json({ message: 'Like crée !' });
      }
    );
  } else {
    return res.status(400).json({ error: 'Pour liker il vaut que la valeur soit égale à 1.' });
  }
};

// ---------------------- Supprimer un like ---------------------- //
exports.deleteLikes = (req, res) => {
  const isLiked = parseInt(req.params.isLiked);
  if (isLiked === 0) {
    database.query(
      'DELETE FROM likes WHERE likes_id = ?',
      [req.params.likesID],
      (error, results) => {
        console.log(results);
        if (results.affectedRows === 0) {
          return res.status(401).json({ message: 'Erreur like indisponible' });
        }
        if (error) {
          console.log(error);
          return res.status(400).json({ error });
        }
        res.status(200).json({ message: 'Like supprimé !' });
      }
    );
  } else {
    return res
      .status(400)
      .json({ error: 'Pour supprimer un like il faut que la valeur transmise soit égale à 0' });
  }
};

// // ---------------------- Récupérer les likes ---------------------- //
// exports.getLikesForPost = (req, res) => {
//   database.query(
//     'SELECT count(likes.user_id) FROM likes WHERE likes.post_id = ' + postId,
//     (error, results) => {
//       if (error) {
//         console.log(error);
//         return res.status(400).json({ error });
//       }
//       res.status(201).json(results);
//     }
//   );
// };

// exports.getLikesFromUser = (req, res) => {
//   database.query(
//     'SELECT likes.post_id post.post_id FROM likes WHERE likes.user_id' + userId,
//     (error, results) => {
//       if (error) {
//         console.log(error);
//         return res.status(400).json({ error });
//       }
//       res.status(201).json(results);
//     }
//   );
// };