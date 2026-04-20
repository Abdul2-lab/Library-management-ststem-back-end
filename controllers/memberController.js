import Member from "../models/Member.js";

export const addMember = async (req, res) => {
  const member = await Member.create(req.body);
  res.json({ message: "Member Added", member });
};

export const getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};
