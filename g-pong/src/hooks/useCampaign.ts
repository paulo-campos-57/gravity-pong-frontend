import { useState, useEffect } from 'react';

export interface CampaignState {
  playerName: string;
  planetName: string;
  hp: number;
  maxHp: number;
  unlockedStage: number;
  retriesUsed: number;
}

const DEFAULT_STATE: CampaignState = {
  playerName: '',
  planetName: '',
  hp: 60,
  maxHp: 60,
  unlockedStage: 1,
  retriesUsed: 0,
};

export function useCampaign() {
  const [campaign, setCampaign] = useState<CampaignState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('gravity_pong_campaign');
    if (saved) {
      setCampaign(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const saveCampaign = (newState: CampaignState) => {
    setCampaign(newState);
    localStorage.setItem('gravity_pong_campaign', JSON.stringify(newState));
  };

  const updateProfile = (playerName: string, planetName: string) => {
    saveCampaign({ ...campaign, playerName, planetName });
  };

  const takeCriticalDamage = () => {
    saveCampaign({ ...campaign, hp: Math.max(0, campaign.hp - 15) });
  };

  const useRetry = (cost: number) => {
    saveCampaign({
      ...campaign,
      hp: Math.max(0, campaign.hp - cost),
      retriesUsed: campaign.retriesUsed + 1,
    });
  };

  const unlockNextStage = (currentStage: number) => {
    if (currentStage >= campaign.unlockedStage) {
      saveCampaign({ ...campaign, unlockedStage: currentStage + 1 });
    }
  };

  const resetCampaign = () => {
    saveCampaign({
      ...DEFAULT_STATE,
      playerName: campaign.playerName,
      planetName: campaign.planetName,
    });
  };

  const hardReset = () => {
    saveCampaign(DEFAULT_STATE);
  };

  return { 
    campaign, 
    isLoaded, 
    updateProfile, 
    takeCriticalDamage, 
    useRetry, 
    unlockNextStage, 
    resetCampaign,
    hardReset 
  };
}