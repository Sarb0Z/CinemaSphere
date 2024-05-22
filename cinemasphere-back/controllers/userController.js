import { getUser, getAllUsers, updateUser } from '../models/user';

const getUserController = async (req, res) => {
  const { id } = req.params;
  const user = await getUser(id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.send(user);
};

const getAllUsersController = async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
};

const updateUserController = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(id, req.body);
  res.send(updatedUser);
};

export { getUserController, getAllUsersController, updateUserController };
