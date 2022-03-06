import { Card, Grid } from '@nextui-org/react'
import { FC } from 'react'
import { useRouter } from 'next/router';

export const FavoriteCardPokemon: FC<{ id: number }> = ({ id }) => {

   const router = useRouter();

   const onFavoriteClicked = () => {
      router.push('/pokemon/[id]', `/pokemon/${id}`);
   }

   return (
      <Grid xs={ 6 } sm={ 3 } md={ 1} key={ id } onClick={ onFavoriteClicked }>
         <Card 
            hoverable 
            clickable 
            css={{ padding: 10 }}
         >
            <Card.Image
               src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
               alt={`Pokémon ${id}`}
               width={ '100%' }
               height={ 200 }
            />
         </Card>
      </Grid>
   )
}