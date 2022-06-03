import styled from 'styled-components';

export const Card = styled.li`
    width: 450px;
    height: 250px;
    background: #3d3d3d;
    border-radius: 20px;
    font-size: 16px;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 640px) {
        width: 100%;
    }

    .character_photo {
        margin-right: 20px;
        height: 100%;

        img {
            border-radius: 20px;
            height: 100%;
            width: 180px;
        }
    }

    .informations_character {
        a {
            text-decoration: none;
            color: #fff;
        }
        h1 {
            color: #fff;
            font-size: 24px;
            font-weight: bold;

            @media (max-width: 640px) {
                font-size: 22px;
            }
        }
        p {
            font-size: 16px;
            margin: 10px 0;
        }
    }
`;
