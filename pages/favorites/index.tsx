import { useEffect, useState } from 'react'
import { NextPage } from 'next'

import { MainLayout } from '../../components/layouts'
import { NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils'
import { FavoritePokemons } from '../../components/pokemon'

const FavoritesPage: NextPage = () => {

	const [ favoritePokemons, setFavoritePokemons ] = useState<number[]>([])

	useEffect(() => {
		setFavoritePokemons(localFavorites.pokemons())
	}, [])
	

	return (
		<MainLayout title='Pokémons - Favoritos'>
			{ favoritePokemons.length === 0 
				? ( <NoFavorites /> ) 
				: ( <FavoritePokemons pokemons={ favoritePokemons } /> )
			}
		</MainLayout>
	)
}

export default FavoritesPage