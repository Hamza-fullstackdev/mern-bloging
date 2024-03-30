import mongoose from "mongoose";

const postScheama = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Davatars&psig=AOvVaw2DcqooCf_M8d5-dyb399_Z&ust=1706100368396000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLja2LLF84MDFQAAAAAdAAAAABAEhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0xlsdvxgARqB-hbJSFj2gF5vWLZV8e-5frw&usqp=CAU",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postScheama);
export default Post;
