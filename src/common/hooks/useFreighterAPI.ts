const useFreighterAPI = () => {
  const freighterAPI = window["freighterApi"];

  const isConnected = (): boolean => freighterAPI.isConnected();
  const getPublicKey = (): Promise<string> => freighterAPI.getPublicKey();
  const getNetwork = (): Promise<string> => freighterAPI.getNetwork();

  return { isConnected, getPublicKey, getNetwork };
};

export default useFreighterAPI;
