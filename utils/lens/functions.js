import { LensClient, development, production } from "@lens-protocol/client";

const Client = new LensClient({
  environment: production,
});

import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Get people you're following
export const getFollowing = async () => {
  const address = await this._address();
  const followed = await Client.profile.allFollowing({ address });
  return followed.items;
};

// Get people following you
export const getFollowers = async () => {
  const profile = await this.getProfile();
  const profileId = profile.id;
  const following = await Client.profile.allFollowers({ profileId });

  return following.items;
};

// Get borrow requests from people you are following
export const getFollowingBorrows = async () => {
  const following = await this.getFollowing();

  const profileIds = following.map((person) => {
    return person.profile.id || "";
  });

  const filters = {
    profileIds,
    publicationTypes: ["POST"],
  };

  const borrows = await Client.publication.fetchAll(filters);
  return borrows.items;
};

// Get your borrow requests
export const getMyBorrows = async () => {
  const profile = await this.getProfile();

  const filters = {
    profileIds: [profile.id],
  };

  const borrows = await Client.publication.fetchAll(filters);

  return Promise.all(
    borrows.items.map(async (borrow) => {
      const lenders = await this.getLenders(borrow.id);

      return {
        ...borrow,
        lenders: lenders.items,
      };
    })
  );
};

// Get lenders to a borrow
export const getLenders = async (borrowId) => {
  return Client.publication.allWalletsWhoCollected({ publicationId: borrowId });
};

// Get profile details
export const getProfile = async () => {
  const address = await this._address();

  const profile = await Client.profile.fetchAll({
    ownedBy: [address],
  });

  return profile.items[0];
};

// Current connected account
export const _address = async () => {
  return await signer.getAddress();
};
