import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

interface IProps {
  id: string;
  getBlogPostById: (id: string) => void;
  setSelectedBlogPostId: (prevState: string) => void;
  toggleModalVisibility: () => void;
}

const CardMenu = ({
  id,
  setSelectedBlogPostId,
  getBlogPostById,
  toggleModalVisibility,
}: IProps) => {
  return (
    <Menu placement="right-start" preventOverflow>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        variant="link"
      />
      <MenuList>
        <MenuItem icon={<EditIcon />} onClick={() => getBlogPostById(id)}>
          Edit
        </MenuItem>
        <MenuItem
          icon={<DeleteIcon />}
          onClick={() => {
            setSelectedBlogPostId(id);
            toggleModalVisibility();
          }}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CardMenu;
