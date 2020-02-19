import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon from 'react-icons-kit';
import { u1F3A8 } from 'react-icons-kit/noto_emoji_regular/u1F3A8';
import { u2716 } from 'react-icons-kit/noto_emoji_regular/u2716';
import t from 'prop-types';

const Aside = styled.aside`
  position: absolute;
  top: 0;
  width: ${props => props.theme.aside.width};
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  right: ${props => (props.isOpen
    ? '0;'
    : `calc(-1 * (${props.theme.aside.width} + ${props.theme.aside.paddingLeft}px * 2));`)}
  transition: ease 0.5s;
  padding-top: ${props => props.theme.aside.paddingTop}px;
  padding-left: ${props => props.theme.aside.paddingLeft}px;
  padding-right: ${props => props.theme.aside.paddingLeft}px;
  ${props => props.isOpen && 'box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.3);'}

  &>div {
    text-align: center;
  }

  @media (min-width: ${props => props.theme.media}) {
    position:relative;
    width:20%;
    right: 0;
    vertical-align: top;
  }
`;
const Toggle = styled.button`
  padding: 0;
  position: absolute;
  left: -40px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px 0 0 6px;
  background-color: #0074d9;
  color: white;
  transition: left 0s linear 0.2s, opacity 0.2s linear;
  ${props => props.hide && 'left:0; opacity: 0;'}

  @media (min-width: ${props => props.theme.media}) {
    display: none
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: calc(-1 * (100vw - ${props => props.theme.aside.width}));
  height: 100vh;
  width: calc(100vw - ${props => props.theme.aside.width});
  display: ${props => (props.show ? 'block' : 'none')};
`;

const Menu = ({ hide, children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [toggleContent, setToggleContent] = useState(u1F3A8);

  useEffect(() => {
    setToggleContent(menuIsOpen ? u2716 : u1F3A8);
  }, [menuIsOpen]);

  const handleClick = event => {
    event.preventDefault();
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <Aside isOpen={menuIsOpen} data-testid="aside">
      <Toggle
        onClick={handleClick}
        onTouchEnd={handleClick}
        hide={hide}
        aria-label="Toggle menu"
        data-testid="toggle"
      >
        <Icon icon={toggleContent} size="30px" />
      </Toggle>
      {children}
      <Background
        onClick={handleClick}
        onTouchEnd={handleClick}
        show={menuIsOpen}
        data-testid="background"
      />
    </Aside>
  );
};

Menu.propTypes = {
  hide: t.bool,
  children: t.oneOfType([t.node, t.arrayOf(t.node)]).isRequired,
};

Menu.defaultProps = {
  hide: false,
};
export default Menu;
