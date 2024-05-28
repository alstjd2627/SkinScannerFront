import styled from "styled-components"

function Result({predictedClass}) {

const getResult = (predictedClass) => {
  if (predictedClass === 'acne_1') {
    return 'Low-level of acne';
  } 
  else if (predictedClass === 'acne_2') {
    return 'medium-level acne';
  }
  else if (predictedClass === 'acne_3') {
    return 'High-level of acne';
  }
  else if (predictedClass === 'normal') {
    return 'No proble! 🥳';
  }
  else {
    return predictedClass;
  }
}


  return (
    <ResultContainer>
      {getResult(predictedClass)}
    </ResultContainer>
  )
}

const ResultContainer = styled.div`
  width: 30vh;
  height : 30vh;
`

export default Result