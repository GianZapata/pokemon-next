import { Container, Image, Text } from '@nextui-org/react'
import React, { FC } from 'react'

export const NoFavorites: FC = () => {
   return (
      <Container css={{ 
         display: 'flex',
         flexDirection: 'column',
         height: 'calc(100% - 100px)',
         alignItems: 'center',
         justifyContent: 'center',				
      }}>
         <Text h1>No hay favoritos</Text>
         <Image 
            src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg'
            alt='No hay favoritos'
            width={ 200 }
            height={ 200 }		
            css={{ opacity: 0.5 }}
         />
      </Container>
   )
}
