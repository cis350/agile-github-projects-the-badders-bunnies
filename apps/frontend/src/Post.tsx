import React, { useState, ChangeEvent, MouseEvent } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type PostInputProps = {
  titleText: string;
  setTitleText: (title: string) => void;
  imageURLText: string;
  setImageURLText: (imageURL: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
};

const PostInput: React.FC<PostInputProps> = ({ titleText,
                                               setTitleText,
                                               imageURLText,
                                               setImageURLText,
                                               descriptionText,
                                               setDescriptionText
                                             }) => {
  return (
    <div className="addCommentBlurb">
      <input
        className="Input"
        type="text"
        value={titleText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleText(e.target.value)}
        placeholder="Post Title"
      />
      <input
        className="Input"
        type="text"
        value={imageURLText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setImageURLText(e.target.value)}
        placeholder="Image URL"
      />
      <input
        className="Input"
        type="text"
        value={descriptionText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionText(e.target.value)}
        placeholder="Description"
      />
    </div>
  );
};

type ProfileInputProps = {
  imageURLText: string;
  setImageURLText: (imageURL: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
};

const ProfileInput: React.FC<ProfileInputProps> = ({
                                                     imageURLText,
                                                     setImageURLText,
                                                     descriptionText,
                                                     setDescriptionText
                                                   }) => {
  return (
    <div className="addCommentBlurb">
      <input
        className="Input"
        type="text"
        value={imageURLText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setImageURLText(e.target.value)}
        placeholder="Image URL"
      />
      <input
        className="Input"
        type="text"
        value={descriptionText}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDescriptionText(e.target.value)}
        placeholder="Description"
      />
    </div>
  );
};


type PostAddDialogProps = {
  addPost: (e: MouseEvent<HTMLButtonElement>) => void;
  titleText: string;
  setTitleText: (title: string) => void;
  imageURLText: string;
  setImageURLText: (imageURL: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
};

const PostAddDialog: React.FC<PostAddDialogProps> = ({ addPost,
                                                       titleText,
                                                       setTitleText,
                                                       imageURLText,
                                                       setImageURLText,
                                                       descriptionText,
                                                       setDescriptionText
                                                     }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setTitleText('');
    setImageURLText('');
    setDescriptionText('');}
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          < PostInput
            titleText={titleText}
            setTitleText={setTitleText}
            imageURLText ={imageURLText}
            setImageURLText={setImageURLText}
            descriptionText ={descriptionText}
            setDescriptionText={setDescriptionText}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

type PostEditDialogProps = {
  editPost: (e: MouseEvent<HTMLButtonElement>) => void;
  deletePost: (e: MouseEvent<HTMLButtonElement>) => void;
  titleText: string;
  setTitleText: (title: string) => void;
  imageURLText: string;
  setImageURLText: (imageURL: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
};

const PostEditDialog: React.FC<PostEditDialogProps> = ({ editPost,
                                                         deletePost,
                                                         titleText,
                                                         setTitleText,
                                                         imageURLText,
                                                         setImageURLText,
                                                         descriptionText,
                                                         setDescriptionText
                                                       }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setTitleText('');
    setImageURLText('');
    setDescriptionText('')};
  const handleShow = () => setShow(true);



  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit This Post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          < PostInput
            titleText={titleText}
            setTitleText={setTitleText}
            imageURLText ={imageURLText}
            setImageURLText={setImageURLText}
            descriptionText ={descriptionText}
            setDescriptionText={setDescriptionText}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editPost}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={deletePost}>
            Delete Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

type ProfileEditDialogProps = {
  editProfile: (e: MouseEvent<HTMLButtonElement>) => void;
  imageURLText: string;
  setImageURLText: (imageURL: string) => void;
  descriptionText: string;
  setDescriptionText: (description: string) => void;
};

const ProfileEditDialog: React.FC<ProfileEditDialogProps> = ({ editProfile,
                                                               imageURLText,
                                                               setImageURLText,
                                                               descriptionText,
                                                               setDescriptionText
                                                             }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setImageURLText('');
    setDescriptionText('')};
  const handleShow = () => setShow(true);



  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          < ProfileInput
            imageURLText ={imageURLText}
            setImageURLText={setImageURLText}
            descriptionText ={descriptionText}
            setDescriptionText={setDescriptionText}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={editProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

type SinglePostProps = {
  postDisplay: string[][]
  setPostDisplay: (postDisplay: string[][]) => void;
  titleURLDesc: string[]
  setTitleText: (title: string) => void;
  setImageURLText: (imageURL: string) => void;
  setDescriptionText: (description: string) => void;
};

const SinglePost: React.FC<SinglePostProps> = ({postDisplay, setPostDisplay, titleURLDesc}) => {
  const [postTitleText, setPostTitleText] = useState(titleURLDesc[0]);
  const [postImageUrlText, setPostImageUrlText] = useState(titleURLDesc[1]);
  const [postDescriptionText, setPostDescriptionText] = useState(titleURLDesc[2]);

  const editPost = () => {
    //update the original post display
    //search & replace is a possibility
    setPostDisplay(
      postDisplay.map((postTitleImageDescTriple)=> {
        if (postTitleImageDescTriple[0] === titleURLDesc[0]
          && postTitleImageDescTriple[1] === titleURLDesc[1]
          && postTitleImageDescTriple[2] === titleURLDesc[2]) {
          return [postTitleText, postImageUrlText , postDescriptionText]
        }
      })
    )

    //
  };
  const deletePost = () => {
    setPostDisplay(postDisplay.filter(titleURLDescTriple => titleURLDescTriple[0] !== titleURLDesc[0]
      || titleURLDescTriple[1] !== titleURLDesc[1]
      || titleURLDescTriple[2] !== titleURLDesc[2]))
  }
  return (
    <>
      <div className="singlePost">
        <div className="postWords">{titleURLDesc[0]}</div>
        <div>
          <img src={titleURLDesc[1]} alt={"Invalid URL"}/>
        </div>
        <span className="postWords">{titleURLDesc[2]}</span>

        <PostEditDialog editPost={() => editPost()}
                        deletePost={() => deletePost()}
                        titleText={postTitleText}
                        setTitleText={setPostTitleText}
                        imageURLText={postImageUrlText}
                        setImageURLText={setPostImageUrlText}
                        descriptionText={postDescriptionText}
                        setDescriptionText={setPostDescriptionText} />
      </div>
    </>
  );
};
//

export const ProfileParent = () => {
  const [showImg, setShowImg] = useState(false);
  const [profileTuple, setProfileTuple] = useState<string[]>([]);
  const [imageUrlText, setImageUrlText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  const editProfile = () => {
    if (imageUrlText !== '' && descriptionText !== '') {
      setProfileTuple([imageUrlText, descriptionText]);
      setImageUrlText('');
      setDescriptionText('');
      setShowImg(true);
    }
  }

  return (
    <>
      <div className="singlePost">
        <div>
          {showImg && <img src={profileTuple[0]} alt={'Invalid URL'} />}
        </div>
        <div className="profileWords">{profileTuple[1]}</div>

        <ProfileEditDialog editProfile={() => editProfile()}
                           imageURLText={imageUrlText}
                           setImageURLText={setImageUrlText}
                           descriptionText={descriptionText}
                           setDescriptionText={setDescriptionText} />
      </div>
    </>

  )
}


const PostParent = () => {
  const [postDisplay, setPostDisplay] = useState<string[][]>([]);
  const [titleText, setTitleText] = useState('');
  const [imageUrlText, setImageUrlText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');

  const addPost = () => {
    if (titleText !== '' && imageUrlText !== '' && descriptionText !== '') {
      setPostDisplay([...postDisplay, [titleText, imageUrlText, descriptionText]]);
      setTitleText('');
      setImageUrlText('');
      setDescriptionText('');
    }
  };

  return (
    <>
      <div className="input">
        < PostAddDialog
          addPost={() => addPost()}
          titleText={titleText}
          setTitleText={setTitleText}
          imageURLText ={imageUrlText}
          setImageURLText={setImageUrlText}
          descriptionText ={descriptionText}
          setDescriptionText={setDescriptionText}
        />
      </div>
      <div className="commentBoard">
        {postDisplay.map((postTriple, index) => (
          <SinglePost key={index}
                      postDisplay={postDisplay}
                      setPostDisplay={setPostDisplay}
                      titleURLDesc={postTriple}
                      setTitleText={setTitleText}
                      setImageURLText={setImageUrlText}
                      setDescriptionText={setDescriptionText}
          />
        ))}
      </div>
    </>
  );
};

export default PostParent;
