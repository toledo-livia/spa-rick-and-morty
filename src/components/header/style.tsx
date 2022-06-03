import styled from 'styled-components';

export const HeaderWrapper = styled.header`
    background: #020d22;
    width: 100%;
    height: 120px;

    display: flex;
    justify-content: center;
    align-items: center;

    .container_title_logo {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 140px;
            width: 100%;
            margin-top: -10%;
        }

        h1 {
            color: #fff;
            font-weight: 100;
            font-size: 32px;

            @media (max-width: 640px) {
                font-size: 22px;
            }
        }
    }
`;
