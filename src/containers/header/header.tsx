import React from'react';
import styled, { css } from 'styled-components';
import chroma from 'chroma-js';
import Link from 'next/link';
import Button from '../../components/button/button';
import { useRouter } from 'next/router'

const Container = styled.div`
    height: 50px;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    line-height: 50px;
    background-color: #333;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    div {
        display: inline-block;
        height: 50px;
        img {
            height: 40px;
            padding: 5px 10px;
        }
    }
    .right-options {
        colof: #fff;
        margin-left: auto;
        order: 2;
        height: 50px;
        padding-right: 10px
    }
    .left-options {
        padding-left: 10px;
    }
`;
const Header = ({user = null}) => {
    const router = useRouter()
	return (
        user ?
            <Container>
                <div>
                    <img src={'/images/user.png'} width={40} height={40}></img>
                </div>
                <div>
                    {user.name}, ({user.username})
                </div>
                <div className='left-options'>
                    <Button text={'Home'}
                        handleAction={() => router.push('/home')} />
                </div>
                <div className='right-options'>
                    <Link prefetch href='/login'>
                        <a>Log as a different user<em></em></a>
                    </Link>
                </div>
            </Container>
        :
            <Container>
                <div className='left-options'>Choose your user:</div>
                <div className='left-options'>
                    <Button text={'Home'} handleAction={() => router.push('/home')} />
                </div>
            </Container>
            
	);
}

export default Header;