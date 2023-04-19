import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const HeaderStyle = styled.header`

`

const Header = () => {
  return (
    <HeaderStyle>
      헤더
      <Link to="login">로그인</Link>
    </HeaderStyle>
  )
}

export default Header