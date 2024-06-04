export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
    {
      /* Aqui si indica la posición que se debe actualizar */
    }
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
