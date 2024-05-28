import React, { useState } from 'react';
import styled from "styled-components";
import axios from 'axios';
import Result from "./components/Result";
import noneImg from "./image/none.png";

function App() {
  const [file, setFile] = useState(null);
  const [uploadImgUrl, setUploadImgUrl] = useState(noneImg);
  const [predictedClass, setPredictedClass] = useState('Wait for your result...');

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setUploadImgUrl(reader.result);
      };
    } else {
      console.error('파일이 선택되지 않았습니다.');
      setUploadImgUrl(noneImg);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://skinscanner.site/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPredictedClass(response.data.predicted_class);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <Container>
      <Title>Skin Scanner</Title>
      <Wrapper>
        <ImgWrapper>
          <h3>⏬ Put your skin Image here!</h3>
          <img src={uploadImgUrl} alt='피부 이미지' />
          <div style={{display:'flex', flexDirection:'row', gap:'1rem'}}>
            <label for="file">
              <FileChooseBtn>Choose File</FileChooseBtn>
            </label>
            <input style={{display : 'none'}} id="file" type="file" name="file" accept="image/*" onChange={handleFileChange} />
            <FileUploadBtn onClick={handleUpload}>Upload</FileUploadBtn>
          </div>
        </ImgWrapper>
        <ResultWrapper>
          <h3>🩻 Your Skin has been scanned</h3>
          <Result predictedClass={predictedClass} />
        </ResultWrapper>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 4.5rem;
  margin: 2rem auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10vh;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 30vh;
  }
  h3 {
    font-weight: 600;
    font-size: 2rem;
    margin: 1rem auto;
  }
`;

const FileChooseBtn = styled.div`
  width: 20vh;
  height: 5vh;
  background-color: aliceblue;
  color: #191f2c;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 10px;
  margin: 1rem auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`

const FileUploadBtn = styled.div`
  width: 20vh;
  height: 5vh;
  background-color: aliceblue;
  color: #191f2c;
  font-weight: 600;
  font-size: 1.2rem;
  border-radius: 10px;
  margin: 1rem auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h3 {
    font-weight: 600;
    font-size: 2rem;
    margin: 1rem auto;
  }
`;

export default App;
