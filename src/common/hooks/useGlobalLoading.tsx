import type { RootState } from '@/app/store/store.ts';
import { useSelector } from 'react-redux';
import { playlistsApi } from '@/features/playlists/api/playlistsApi.ts';
import { tracksApi } from '@/features/tracks/api/tracksApi.ts';

const excludedEndpoints = [playlistsApi.endpoints.getPlaylists.name, tracksApi.endpoints.fetchTracks.name];
// const excludedEndpointsMutations = ['likePlaylist', 'dislikePlaylist'];

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    // Получаем все активные запросы/мутации из RTK Query API
    const queries = Object.values(state.baseApi.queries || {});
    // const mutations = Object.values(state.baseApi.mutations || {});

    // Есть ли активный (pending) запрос, который НЕ в списке исключений
    const hasActiveQueries = queries.some((query) => {
      if (!query) return false;
      return query.status === 'pending' && !excludedEndpoints.includes(query.endpointName);
    });

    // Mutation commented because it is not needed for the global loading indicator, but can be uncommented if needed in the future.

    // // Есть ли активная (pending) мутация, которая НЕ в списке исключений
    // const hasActiveMutations = mutations.some((mutation) => {
    //   if (!mutation) return false;
    //   return (
    //     mutation.status === 'pending' && !excludedEndpointsMutations.includes(mutation.endpointName || '')
    //   );
    // });

    // Показываем глобальный прогресс, если есть хотя бы один релевантный pending запрос или мутация
    return Boolean(hasActiveQueries);
  });
};
