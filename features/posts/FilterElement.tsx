import styled from "styled-components";
import Canvas from "./Canvas";
import { useState } from "react";

const FilterElement = ({
  key,
  photoUrl,
  filterTitle,
  filter,
  handleFilter
}: {
  key: number;
  photoUrl: string;
  filterTitle: string;
  filter: string;
  handleFilter: (filterTitle: string, newPhoto: string) => void;
}) => {
  const [newPhoto, setNewPhoto] = useState("");

  const handleFilterChose = () => {
    handleFilter(filter, newPhoto);
  };

  return (
    <StyledModalBody onClick={handleFilterChose}>
      <Canvas
        photo={photoUrl}
        filter={filter}
        width={"108px"}
        height={"108px"}
        setImageUrl={setNewPhoto}
      />
      <StyledFilterTitle>{filterTitle}</StyledFilterTitle>
    </StyledModalBody>
  );
};

export default FilterElement;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: auto;
`;

const StyledFilterTitle = styled.div`
  width: 100%;
  max-width: 160px;
  text-align: center;
`;
