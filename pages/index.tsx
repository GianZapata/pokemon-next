import { GetStaticProps, NextPage } from 'next'
import { Grid } from '@nextui-org/react'

import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import { MainLayout } from '../components/layouts'
import { PokeCard } from '../components/pokemon'

interface Props { 
	pokemons: SmallPokemon[]	
}

const HomePage: NextPage<Props> = ({ pokemons }) => {	
	return (
		<MainLayout title='Listado de Pokémon'>
			<Grid.Container gap={ 2 } justify="flex-start">
				{ pokemons.map( pokemon => <PokeCard key={ pokemon.id } pokemon={ pokemon }/>  )}
			</Grid.Container>
		</MainLayout>
	)
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
// Get static props funciona como un middleware, es decir, antes de que se renderice la pagina, se ejecuta esta funcion
// Snippet = nextgetstaticProps
// SSG = Static Side	Generation
export const getStaticProps: GetStaticProps = async (context) => {
	const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')			
	const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
		...poke,
		id: i + 1,
		img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
	}))

	return {
		props: { pokemons }
	}
}

export default HomePage
