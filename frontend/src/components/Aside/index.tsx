import React, { useState } from 'react';
import { BsFolderPlus } from 'react-icons/bs';
import {
  MdArrowDownward,
  MdArrowUpward,
  MdAssignment,
  MdClose,
  MdDashboard,
  MdExitToApp,
  MdMenu
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';
import { useTheme } from '../../hooks/theme';
import Toggle from '../Toggle';
import {
  Container,
  DropdownLi,
  DropdownUl,
  Header,
  LogImg,
  MenuContainer,
  MenuItem,
  MenuItemButton,
  MenuItemLink,
  MenuItemLinkDropdown,
  ThemeToggleFooter,
  Title,
  ToggleMenu
} from './styles';

const Aside: React.FC = () => {
  const { signOut } = useAuth();
  const { toggleTheme, theme } = useTheme();

  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() => (theme.title === 'dark' ? true : false));

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  return (
    <Container menuIsOpen={toggleMenuIsOpened}>
      <Header>
        <ToggleMenu onClick={handleToggleMenu}>{toggleMenuIsOpened ? <MdClose /> : <MdMenu />}</ToggleMenu>

        <LogImg src={logoImg} alt="Logo Bela Morenna" />
        <Title>Bela Morenna</Title>
      </Header>

      <MenuContainer>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <MenuItemLink>
            <MdDashboard />
            Dashboard
          </MenuItemLink>
        </Link>

        <Link to="/list/entry-balance" style={{ textDecoration: 'none' }}>
          <MenuItemLink>
            <MdArrowUpward />
            Entradas
          </MenuItemLink>
        </Link>

        <Link to="/list/exit-balance" style={{ textDecoration: 'none' }}>
          <MenuItemLink>
            <MdArrowDownward />
            Saídas
          </MenuItemLink>
        </Link>

        <MenuItem>
          <MdAssignment />
          Cadastros
          <DropdownUl>
            <DropdownLi>
              <Link to="/register/sales" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Vendas
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/purchases" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Compras
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/products" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Produtos
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/customers" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Clientes
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/providers" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Fornecedores
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/users" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Usuarios
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/payments" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Pagamentos
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
            <DropdownLi>
              <Link to="/register/sizes/989" style={{ textDecoration: 'none' }}>
                <MenuItemLinkDropdown>
                  <BsFolderPlus />
                  Tamanhos
                </MenuItemLinkDropdown>
              </Link>
            </DropdownLi>
          </DropdownUl>
        </MenuItem>

        <MenuItemButton onClick={signOut}>
          <MdExitToApp />
          Sair
        </MenuItemButton>
      </MenuContainer>

      <ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle labelLeft="Light" labelRight="Dark" checked={darkTheme} onChange={handleChangeTheme} />
      </ThemeToggleFooter>
    </Container>
  );
};

export default Aside;
