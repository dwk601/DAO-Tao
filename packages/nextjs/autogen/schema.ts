import { useGraphQLCodegen } from "./useGraphQLCodegen";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccountID: string;
  Address: string;
  Any: any;
  AssetID: string;
  BlockID: any;
  Bytes: string;
  Bytes32: string;
  ChainID: string;
  Date: any;
  Hash: any;
  HashID: any;
  IntID: any;
  JSON: any;
  Map: any;
  ProposalID: any;
  Timestamp: string;
  UUID: any;
  Uint256: any;
  Upload: any;
};

/** Key for use with this API.  See https://docs.tally.xyz/tally-api/welcome#request-an-api-key for how to request & use! */
export type ApiKey = {
  /** Last four characters of original generated key */
  lastFour: Scalars["String"];
  /** User generated name to differentiate keys */
  name: Scalars["String"];
};

export type AbiElement = {
  name: Scalars["String"];
  type: Scalars["String"];
};

export type Account = {
  address: Scalars["Address"];
  apiKeys?: Maybe<Array<ApiKey>>;
  bio: Scalars["String"];
  email: Scalars["String"];
  ens?: Maybe<Scalars["String"]>;
  features?: Maybe<Array<FeatureState>>;
  id: Scalars["ID"];
  isOFAC: Scalars["Boolean"];
  name: Scalars["String"];
  otherLinks?: Maybe<Array<OtherLink>>;
  picture?: Maybe<Scalars["String"]>;
  proposalsCreatedCount: Scalars["Int"];
  safes?: Maybe<Array<Scalars["AccountID"]>>;
  twitter?: Maybe<Scalars["String"]>;
  type: AccountType;
  votes: Scalars["Uint256"];
};

export type AccountProposalsCreatedCountArgs = {
  input: ProposalsCreatedCountInput;
};

export type AccountVotesArgs = {
  governorId: Scalars["AccountID"];
};

export type AccountElectionMeta = {
  hasRegistered: Scalars["Boolean"];
  isContender: Scalars["Boolean"];
  /** The contender's statement, set during register as candidate flow. */
  statement?: Maybe<Scalars["String"]>;
  /** The contender's title, set during register as candidate flow. */
  title?: Maybe<Scalars["String"]>;
};

export enum AccountType {
  Eoa = "EOA",
  Safe = "SAFE",
}

/** Source of data: Hexagate. All the events/threats for an executable call, along with a result describing whether the simulation was successful i.e. was Hexagate able to successfully run this action */
export type ActionThreatData = {
  events?: Maybe<Array<EventDataPoint>>;
  result: Scalars["String"];
};

/** Security check for a bundle of actions (proposal-level) */
export type ActionsSecurityCheck = {
  metadata: ActionsSecurityCheckMetadata;
  simulations: Array<TransactionSimulationV2>;
};

/** Metadata for a bundle (proposal-level) security check */
export type ActionsSecurityCheckMetadata = {
  threatAnalysis?: Maybe<ThreatAnalysis>;
};

export type AddAdminInput = {
  address: Scalars["String"];
  role: OrganizationRole;
};

export type AddressInfo = {
  accounts: Array<Account>;
  address: Scalars["Address"];
  /** Account used for SIWE (auth). */
  ethAccount: Account;
};

/** Source of data: Hexagate. Action-level (executable call) analysis data point, the name is a label (e.g. SMARTCONTRACT_IMPLEMENTS_ANTI_SIMULATION_TECHNIQUES) and the result gives an indication whether or not it passed the check */
export type AnalysisDataPointV2 = {
  name: Scalars["String"];
  result: Scalars["Boolean"];
};

export type BalanceItem = {
  address: Scalars["String"];
  balance: Scalars["String"];
  balance24H: Scalars["String"];
  decimals: Scalars["Int"];
  logo: Scalars["String"];
  name: Scalars["String"];
  nativeToken: Scalars["Boolean"];
  quote?: Maybe<Scalars["Float"]>;
  quote24H?: Maybe<Scalars["Float"]>;
  quoteRate?: Maybe<Scalars["Float"]>;
  quoteRate24H?: Maybe<Scalars["Float"]>;
  symbol: Scalars["String"];
  type: Scalars["String"];
};

export type Block = {
  id: Scalars["BlockID"];
  number: Scalars["Int"];
  timestamp: Scalars["Timestamp"];
  ts: Scalars["Timestamp"];
};

export type BlockExplorer = {
  apiUrl: Scalars["String"];
  type: BlockExplorerType;
  url: Scalars["String"];
};

export enum BlockExplorerType {
  Blockscout = "blockscout",
  Etherscan = "etherscan",
  Other = "other",
}

export type BlockIdInput = {
  blockNumber: Scalars["Int"];
  chain: Scalars["ChainID"];
};

export type BlockOrTimestamp = Block | BlocklessTimestamp;

export type BlocklessTimestamp = {
  timestamp: Scalars["Timestamp"];
};

export type Candidate = {
  account: Account;
  totalVoters: Scalars["Int"];
  totalVotes: Scalars["Uint256"];
  votes: Array<CandidateVote>;
};

export type CandidateVotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type CandidateExport = {
  address: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
};

export enum CandidateSort {
  Alphabetical = "ALPHABETICAL",
  Random = "RANDOM",
  Votes = "VOTES",
}

export type CandidateVote = {
  voter: Account;
  weight: Scalars["Uint256"];
};

export type CastVoteActionMetadata = {
  /** Address of the user casting the vote */
  address: Scalars["Address"];
  /** The amount of gas paid for the given meta transaction */
  gasPrice: Scalars["Uint256"];
  /** Address of the governor related to the vote */
  governorId: Scalars["AccountID"];
  /** ID of the proposal related to the dao */
  proposalId: Scalars["ID"];
  /** The vote support as FOR, AGAINST or ABSTAIN */
  support?: Maybe<SupportType>;
  /** Executor's generated transaction id (not the same as chain transaction id) */
  transactionID: Scalars["String"];
  /** Executor's given end date validaty of the transaction */
  validUntil: Scalars["Timestamp"];
};

/** Chain data in the models are only loaded on server startup. If changed please restart the api servers. */
export type Chain = {
  blockExplorer?: Maybe<BlockExplorer>;
  /** Average block time in seconds. */
  blockTime: Scalars["Float"];
  /** Chain as parameter found in the eip. */
  chain: Scalars["String"];
  /** Boolean true if Covalent supports this network in it's API. */
  covalentSupport: Scalars["Boolean"];
  /** Boolean true if Cowswap supports the chain, false if it doesn't. */
  cowswapSupport: Scalars["Boolean"];
  /** Env Explorer Arg, which can be nil, is the env arg name of the key that we will use in the FE */
  envExplorerArg?: Maybe<Scalars["String"]>;
  /** Env RPC Arg, which can be nil, is the env arg name of the RPC endpoint that we will use in the FE */
  envRPCArg?: Maybe<Scalars["String"]>;
  features?: Maybe<Array<FeatureState>>;
  /** gnosisServiceURL of the chain, can be empty or an string */
  gnosisServiceURL?: Maybe<Scalars["String"]>;
  /** Boolean true if Hexagate supports this network in it's API. */
  hexagateAnalysisSupport: Scalars["Boolean"];
  /** The id in eip155:chain_id */
  id: Scalars["ChainID"];
  isDeprecated: Scalars["Boolean"];
  /** Boolean true if it is a testnet, false if it's not. */
  isTestnet: Scalars["Boolean"];
  /** If chain is an L2, the L1 id in format eip155:chain_id */
  layer1Id?: Maybe<Scalars["ChainID"]>;
  /** Chain name with removed redundancy and unnecessary words. e.g.: Ethereum Rinkeby */
  mediumName: Scalars["String"];
  /** Contract address of Milkman (for Cowswap proposals). */
  milkmanContract?: Maybe<Scalars["AccountID"]>;
  /** Chain name as found in eip lists. e.g.: Ethereum Testnet Rinkeby */
  name: Scalars["String"];
  /** Data from chain native currency. */
  nativeCurrency: NativeCurrency;
  /** Chain short name as found in eip lists. The Acronym of it. e.g.: rin */
  shortName: Scalars["String"];
  /** Icon SVG of the chain logo. */
  svg?: Maybe<Scalars["String"]>;
  /** Boolean true if Tenderly supports simulations. */
  tenderlySupport: Scalars["Boolean"];
  /** Boolean true if L2 depends on L1 for voting period, false if it doesn't. */
  useLayer1VotingPeriod: Scalars["Boolean"];
};

export type ClaimAndDelegateAttempt = {
  createdAt: Scalars["Timestamp"];
  delegateeId: Scalars["AccountID"];
  delegatorId: Scalars["AccountID"];
  expiry: Scalars["Uint256"];
  parameterR: Scalars["Bytes32"];
  parameterS: Scalars["Bytes32"];
  parameterV: Scalars["Uint256"];
  proof?: Maybe<Array<Scalars["String"]>>;
  tokenId: Scalars["AssetID"];
  txID: Scalars["HashID"];
};

export type CloudEvent = {
  data: Scalars["Map"];
  datacontenttype?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  source: Scalars["String"];
  specversion: Scalars["String"];
  subject?: Maybe<Scalars["String"]>;
  time?: Maybe<Scalars["Timestamp"]>;
  type: CloudEventType;
};

export type CloudEventInput = {
  /** CloudEvent data (i.e. JSON object) */
  data: Scalars["Map"];
  /** Content type of the CloudEvent data (i.e. application/json) */
  datacontenttype?: InputMaybe<Scalars["String"]>;
  /** UUID of the CloudEvent */
  id: Scalars["UUID"];
  /** Source of the CloudEvent as URI reference (i.e. https://example.com or /example) */
  source: Scalars["String"];
  /** Version of the CloudEvent specification */
  specversion: Scalars["String"];
  /** Optional subject of the CloudEvent */
  subject?: InputMaybe<Scalars["String"]>;
  /** RFC3339 timestamp of when the CloudEvent was created */
  time: Scalars["Timestamp"];
  /** Type of the CloudEvent */
  type: CloudEventType;
};

export enum CloudEventType {
  DelegationIsSeekingDelegationsToggle = "delegationIsSeekingDelegationsToggle",
}

export type Collectible = {
  ID: Scalars["ID"];
  address: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  imageURI?: Maybe<Scalars["String"]>;
  logoURI: Scalars["String"];
  metadata?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  tokenName: Scalars["String"];
  tokenSymbol: Scalars["String"];
  uri?: Maybe<Scalars["String"]>;
};

export type Confirmation = {
  owner: Account;
  signature: Scalars["Bytes"];
  signatureType: Scalars["String"];
  submissionDate: Scalars["Timestamp"];
};

export type Contact = {
  discord: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  twitter: Scalars["String"];
};

export type ContactInput = {
  discord: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  twitter: Scalars["String"];
};

export type Contender = Candidate & {
  account: Account;
  accountElectionMeta: AccountElectionMeta;
  id: Scalars["ID"];
  nominated: Scalars["Boolean"];
  rejected: Scalars["Boolean"];
  totalVoters: Scalars["Int"];
  totalVotes: Scalars["Uint256"];
  votes: Array<CandidateVote>;
};

export type ContenderVotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export enum ContenderFilter {
  All = "ALL",
  Qualified = "QUALIFIED",
  SeekingVotes = "SEEKING_VOTES",
}

export type ContractVerificationV2 = {
  isVerified: Scalars["Boolean"];
};

export type Contracts = {
  governor: GovernorContract;
  tokens: Array<TokenContract>;
};

export type Council = {
  cohortSize: Scalars["Int"];
  description: Scalars["String"];
  elections: Array<Election>;
  id: Scalars["IntID"];
  members: CouncilMembers;
  name: Scalars["String"];
  slug: Scalars["String"];
};

export type CouncilElectionsArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type CouncilMembers = {
  firstCohort: Array<Account>;
  secondCohort: Array<Account>;
};

export type CovalentData = {
  decimals: Scalars["Int"];
  logo: Scalars["String"];
  name: Scalars["String"];
  price: Scalars["Float"];
  symbol: Scalars["String"];
};

export type CreateDaoInput = {
  description: Scalars["String"];
  /** The governors that control the DAO. */
  governors?: InputMaybe<Array<CreateGovernorInputV2>>;
  name: Scalars["String"];
  /** For DAOs that have yet to deploy governors but have tokens, use this field. DO NOT use this field if governors are defined in the `governors` field. */
  tokens?: InputMaybe<Array<CreateTokenInput>>;
};

export type CreateGovernorInput = {
  id: Scalars["AccountID"];
  kind?: InputMaybe<GovernorKind>;
  metadata?: InputMaybe<GovernorMetadataInput>;
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
  /** The block height at which the Governor contract was originally deployed. */
  startBlock: Scalars["Int"];
  tokenId: Scalars["AssetID"];
  type: GovernorType;
};

export type CreateGovernorInputV2 = {
  hubGovernorAccountId?: InputMaybe<Scalars["AccountID"]>;
  hubVotePoolAddress?: InputMaybe<Scalars["Address"]>;
  id: Scalars["AccountID"];
  spokeMetadataCollectorAddress?: InputMaybe<Scalars["Address"]>;
  startBlock: Scalars["Int"];
  token: CreateTokenInput;
  type: GovernorType;
};

export type CreateGovernorsInput = {
  governors: Array<CreateGovernorInput>;
  /** Organization is required when creating a new DAO with govenors and tokens */
  organization?: InputMaybe<CreateOrganizationInput>;
  /** Organization id is required when creating governors for an existing DAO */
  organizationId?: InputMaybe<Scalars["IntID"]>;
  /** Tokens are required when creating a new DAO with govenors and tokens or when tokens for govenrors have not been created yet */
  tokens?: InputMaybe<Array<CreateTokenInput>>;
};

export type CreateOrganizationInput = {
  metadata?: InputMaybe<OrganizationMetadataInput>;
  name: Scalars["String"];
  uxVersion?: InputMaybe<OrgUxVersion>;
};

export type CreateProposalActionAttemptInput = {
  actor: Scalars["Address"];
  proposalId: Scalars["IntID"];
  txHash: Scalars["Hash"];
  type: ProposalActionType;
};

export type CreateProposalInput = {
  description: Scalars["String"];
  discourseURL?: InputMaybe<Scalars["String"]>;
  executableCalls: Array<ExecutableCallInput>;
  governorId: Scalars["AccountID"];
  originalId?: InputMaybe<Scalars["IntID"]>;
  simulationValue?: InputMaybe<Scalars["Uint256"]>;
  skipHexagate?: InputMaybe<Scalars["Boolean"]>;
  skipTenderly?: InputMaybe<Scalars["Boolean"]>;
  snapshotURL?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
  txHash?: InputMaybe<Scalars["Hash"]>;
};

export type CreateSafeInput = {
  id: Scalars["AccountID"];
  name?: InputMaybe<Scalars["String"]>;
  organizationId: Scalars["IntID"];
};

export type CreateTokenInput = {
  id: Scalars["AssetID"];
  /** The block height at which the Token contract was originally deployed. */
  startBlock: Scalars["Int"];
};

export type CreateUnistakerTransactionInput = {
  address: Scalars["Address"];
  beneficiary?: InputMaybe<Scalars["Address"]>;
  delegatee?: InputMaybe<Scalars["Address"]>;
  depositId?: InputMaybe<Scalars["String"]>;
  id: Scalars["HashID"];
  newAmount?: InputMaybe<Scalars["Uint256"]>;
  previousAmount?: InputMaybe<Scalars["Uint256"]>;
  status: UnistakerTransactionStatus;
  type: UnistakerTransactionType;
};

export type CreateVoteAttemptInput = {
  proposalId: Scalars["IntID"];
  txHash: Scalars["Hash"];
  type: VoteType;
  voter: Scalars["Address"];
};

export type DataDecoded = {
  method: Scalars["String"];
  parameters: Array<Parameter>;
};

export type Delegate = {
  account: Account;
  chainId?: Maybe<Scalars["ChainID"]>;
  delegatorsCount: Scalars["Int"];
  governor?: Maybe<Governor>;
  id: Scalars["IntID"];
  organization?: Maybe<Organization>;
  statement?: Maybe<DelegateStatement>;
  token?: Maybe<Token>;
  voteChanges: Array<VotingPowerChange>;
  votesCount: Scalars["Uint256"];
};

export type DelegateVotesCountArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
};

export type DelegateActionMetadata = {
  /** Address of the user receiving the delegation */
  delegatee: Scalars["Address"];
  /** Address of the user delegating using a meta transaction action */
  from: Scalars["Address"];
  /** The amount of gas paid for the given meta transaction */
  gasPrice: Scalars["Uint256"];
  /** The DAO contract chain scoped information */
  tokenContractId: Scalars["AssetID"];
  /** Executor's generated transaction id (not the same as chain transaction id) */
  transactionId: Scalars["String"];
  /** Executor's given end date validaty of the transaction */
  validUntil: Scalars["Timestamp"];
};

export type DelegateInput = {
  address: Scalars["Address"];
  governorId?: InputMaybe<Scalars["AccountID"]>;
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type DelegateStatement = {
  address: Scalars["Address"];
  dataSource: DelegateStatementSource;
  dataSourceURL?: Maybe<Scalars["String"]>;
  discourseProfileLink?: Maybe<Scalars["String"]>;
  discourseUsername?: Maybe<Scalars["String"]>;
  hideDisclaimer?: Maybe<Scalars["Boolean"]>;
  id: Scalars["IntID"];
  isMember?: Maybe<Scalars["Boolean"]>;
  isSeekingDelegation?: Maybe<Scalars["Boolean"]>;
  issues?: Maybe<Array<Issue>>;
  organizationID: Scalars["IntID"];
  statement: Scalars["String"];
  statementSummary?: Maybe<Scalars["String"]>;
};

export enum DelegateStatementSource {
  Script = "script",
  User = "user",
}

export type DelegatesFiltersInput = {
  /** `address` filter in combination with `organizationId` allows fetching delegate info of this address from each chain */
  address?: InputMaybe<Scalars["Address"]>;
  governorId?: InputMaybe<Scalars["AccountID"]>;
  hasDelegators?: InputMaybe<Scalars["Boolean"]>;
  hasVotes?: InputMaybe<Scalars["Boolean"]>;
  isSeekingDelegation?: InputMaybe<Scalars["Boolean"]>;
  issueIds?: InputMaybe<Array<Scalars["IntID"]>>;
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type DelegatesInput = {
  filters: DelegatesFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<DelegatesSortInput>;
};

export enum DelegatesSortBy {
  /** Sorts by total delegators. */
  Delegators = "delegators",
  /** The default sorting method. It sorts by date. */
  Id = "id",
  /** Sorts by DAO prioritization. */
  Prioritized = "prioritized",
  /** Sorts by voting power. */
  Votes = "votes",
}

export type DelegatesSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: DelegatesSortBy;
};

export type Delegation = {
  blockNumber: Scalars["Int"];
  blockTimestamp: Scalars["Timestamp"];
  chainId: Scalars["ChainID"];
  delegate: Account;
  delegator: Account;
  id: Scalars["IntID"];
  organization: Organization;
  token: Token;
  votes: Scalars["Uint256"];
};

export type DelegationAttempt = {
  createdAt: Scalars["Timestamp"];
  delegateeId: Scalars["AccountID"];
  delegatorId: Scalars["AccountID"];
  governanceId: Scalars["AccountID"];
  txID: Scalars["HashID"];
};

export type DelegationInput = {
  address: Scalars["Address"];
  governorId?: InputMaybe<Scalars["AccountID"]>;
  tokenId?: InputMaybe<Scalars["AssetID"]>;
};

export type DelegationsFiltersInput = {
  address: Scalars["Address"];
  governorId?: InputMaybe<Scalars["AccountID"]>;
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type DelegationsInput = {
  filters: DelegationsFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<DelegationsSortInput>;
};

export enum DelegationsSortBy {
  /** The default sorting method. It sorts by date. */
  Id = "id",
  /** Sorts by voting power. */
  Votes = "votes",
}

export type DelegationsSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: DelegationsSortBy;
};

export type Election = {
  accountElectionMeta: AccountElectionMeta;
  councilId: Scalars["Int"];
  id: Scalars["ID"];
  /** 2nd round of election. */
  memberRound?: Maybe<MemberRound>;
  /** 1st round of election. */
  nominationRound: NominationRound;
  /** Election number, incremental. */
  number: Scalars["Int"];
  status: ElectionStatus;
};

export type ElectionAccountElectionMetaArgs = {
  address: Scalars["String"];
};

export enum ElectionStatus {
  Complete = "COMPLETE",
  Grace = "GRACE",
  Member = "MEMBER",
  Nomination = "NOMINATION",
}

export type Eligibility = {
  /** Amount the account can claim from this token */
  amount?: Maybe<Scalars["Uint256"]>;
  proof?: Maybe<Array<Scalars["String"]>>;
  /** Whether the account is eligible to claim */
  status: EligibilityStatus;
  tx?: Maybe<Scalars["HashID"]>;
};

export enum EligibilityStatus {
  Claimed = "CLAIMED",
  Eligible = "ELIGIBLE",
  Noteligible = "NOTELIGIBLE",
}

/** Source of data: Hexagate. Proposal-level analysis data point (it is per executable call, but run with Hexagate Governance analysis), the name is a label (e.g. SMARTCONTRACT_IMPLEMENTS_ANTI_SIMULATION_TECHNIQUES) and the result gives an indication whether or not it passed the check */
export type EventDataPoint = {
  description: Scalars["String"];
  eventType: Scalars["String"];
  severity: Scalars["String"];
};

export type ExecutableCall = {
  calldata: Scalars["Bytes"];
  chainId: Scalars["ChainID"];
  index: Scalars["Int"];
  offchaindata?: Maybe<ExecutableCallOffchainData>;
  /** Target contract's function signature. */
  signature?: Maybe<Scalars["String"]>;
  target: Scalars["Address"];
  type?: Maybe<ExecutableCallType>;
  value: Scalars["Uint256"];
};

export type ExecutableCallInput = {
  calldata: Scalars["Bytes"];
  offchaindata?: InputMaybe<Scalars["JSON"]>;
  signature?: InputMaybe<Scalars["String"]>;
  target: Scalars["Address"];
  type: ExecutableCallType;
  value: Scalars["Uint256"];
};

export type ExecutableCallOffchainData = ExecutableCallRewards | ExecutableCallSwap;

export type ExecutableCallRewards = {
  contributorFee: Scalars["Int"];
  recipients: Array<Scalars["String"]>;
  tallyFee: Scalars["Int"];
};

export type ExecutableCallSwap = {
  /** Sell amount for the swap. */
  amountIn: Scalars["Uint256"];
  buyToken: TokenData;
  /** Tally fee */
  fee?: Maybe<Scalars["Uint256"]>;
  /** Order if the proposal is executed. */
  order?: Maybe<SwapOrder>;
  priceChecker: PriceChecker;
  /** Quote if no order exists yet. */
  quote?: Maybe<SwapQuote>;
  sellToken: TokenData;
  to: Scalars["AccountID"];
};

export enum ExecutableCallType {
  Custom = "custom",
  Empty = "empty",
  Erc20transfer = "erc20transfer",
  Erc20transferarbitrum = "erc20transferarbitrum",
  Nativetransfer = "nativetransfer",
  Orcamanagepod = "orcamanagepod",
  Other = "other",
  Reward = "reward",
  Swap = "swap",
}

export type FeatureState = {
  account?: Maybe<Account>;
  chainID?: Maybe<Scalars["ChainID"]>;
  enabled: Scalars["Boolean"];
  governor?: Maybe<Governor>;
  name: Scalars["String"];
  organization?: Maybe<Organization>;
};

/** The `File` type, represents the response of uploading a file. */
export type File = {
  contentType: Scalars["String"];
  id: Scalars["String"];
  metadata: Image;
  name: Scalars["String"];
  url: Scalars["String"];
};

export type ForumActivity = {
  topics: Array<ForumTopic>;
};

export type ForumTopic = {
  bumpedAt?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  fancyTitle?: Maybe<Scalars["String"]>;
  highestPostNumber?: Maybe<Scalars["Int"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  lastPostedAt: Scalars["String"];
  likeCount: Scalars["Int"];
  originalPosterAvatarTemplate?: Maybe<Scalars["String"]>;
  originalPosterName?: Maybe<Scalars["String"]>;
  originalPosterUsername?: Maybe<Scalars["String"]>;
  pinned?: Maybe<Scalars["Boolean"]>;
  postsCount: Scalars["Int"];
  replyCount: Scalars["Int"];
  slug?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  views: Scalars["Int"];
};

export type GnosisSafe = {
  /** Values of all Tokens in this Gnosis Safe */
  balance?: Maybe<Treasury>;
  collectibles?: Maybe<Array<Maybe<Collectible>>>;
  /** GnosisSafe smart contract AccountID. */
  id: Scalars["AccountID"];
  /** GnosisSafe name to help distinguish it. */
  name?: Maybe<Scalars["String"]>;
  /** A counter of the amount of transactions executed on the safe. */
  nonce?: Maybe<Scalars["Int"]>;
  /** A list of owner Accounts.  The Account includes participations, but we haven't included gnosis safe owners or signers in the participations yet. */
  owners?: Maybe<Array<Account>>;
  /** The amount of confirmations (owner signatures) that are required to execute a transaction. */
  threshold?: Maybe<Scalars["Int"]>;
  /** GnosisSafe smart contract version. */
  version?: Maybe<Scalars["String"]>;
};

/** A transaction can be `SUBMITTED` or `EXECUTED`. An `EXECUTED` transaction will include a block and an on chain txHashID. */
export type GnosisSafeTransaction = {
  /** `Block` at which this safe transaction was executed. */
  block?: Maybe<Block>;
  /** All the owners that have signed the transaction. */
  confirmations: Array<Confirmation>;
  /** DataDecoded includes the method and parameters used in the transaction. */
  dataDecoded?: Maybe<DataDecoded>;
  /** Chain scoped safeTxHash- https://github.com/safe-global/safe-contracts/blob/da66b45ec87d2fb6da7dfd837b29eacdb9a604c5/contracts/GnosisSafe.sol#L353-L394. */
  id: Scalars["HashID"];
  /** Current counter of multisig transactions executed on this safe.  No two transactions on this contract will have the same `nonce`. */
  nonce?: Maybe<Scalars["Uint256"]>;
  /** `GnosisSafe` smart contract AccountID. */
  safeID: Scalars["AccountID"];
  /** Chain scoped safeTxHash- https://github.com/safe-global/safe-contracts/blob/da66b45ec87d2fb6da7dfd837b29eacdb9a604c5/contracts/GnosisSafe.sol#L353-L394. */
  safeTxHashID?: Maybe<Scalars["HashID"]>;
  /** Executed transaction verified signatures. */
  signatures?: Maybe<Scalars["Bytes"]>;
  /** A list of all states the transaction has been through with a timestamp.  A transaction can be `SUBMITTED` or `EXECUTED`.  Similar to a governor proposal. */
  statusChanges: Array<GnosisStatusChange>;
  /** Ethereum transaction hash of the executed transaction. */
  txHashID?: Maybe<Scalars["HashID"]>;
};

export type GnosisSafesInput = {
  organizationIds?: InputMaybe<Array<Scalars["IntID"]>>;
};

export type GnosisStatusChange = {
  timestamp: Scalars["Timestamp"];
  type: GnosisStatusChangeType;
};

export enum GnosisStatusChangeType {
  Executed = "EXECUTED",
  Submitted = "SUBMITTED",
}

export type Governor = {
  chainId: Scalars["ChainID"];
  contracts: Contracts;
  delegatesCount: Scalars["Int"];
  delegatesVotesCount: Scalars["Uint256"];
  features?: Maybe<Array<FeatureState>>;
  id: Scalars["AccountID"];
  isBehind: Scalars["Boolean"];
  isIndexing: Scalars["Boolean"];
  isPrimary: Scalars["Boolean"];
  kind: GovernorKind;
  /** Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged. */
  lastIndexedBlock: Block;
  metadata?: Maybe<GovernorMetadata>;
  /** Tally name of the governor contract */
  name: Scalars["String"];
  organization: Organization;
  parameters: GovernorParameters;
  proposalStats: ProposalStats;
  /** The minumum amount of votes (total or for depending on type) that are currently required to pass a proposal. */
  quorum: Scalars["Uint256"];
  /** Tally slug used for this goverance: tally.xyz/gov/[slug] */
  slug: Scalars["String"];
  /** Chain scoped address of the timelock contract for this governor if it exists. */
  timelockId?: Maybe<Scalars["AccountID"]>;
  token: Token;
  tokenId: Scalars["AssetID"];
  tokenOwnersCount: Scalars["Int"];
  type: GovernorType;
};

export type GovernorContract = {
  address: Scalars["Address"];
  lastBlock: Scalars["Int"];
  type: GovernorType;
};

export type GovernorInput = {
  id?: InputMaybe<Scalars["AccountID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export enum GovernorKind {
  Hub = "hub",
  Multiother = "multiother",
  Multiprimary = "multiprimary",
  Multisecondary = "multisecondary",
  Single = "single",
  Spoke = "spoke",
}

export type GovernorMetadata = {
  description?: Maybe<Scalars["String"]>;
};

export type GovernorMetadataInput = {
  description?: InputMaybe<Scalars["String"]>;
};

export type GovernorParameters = {
  clockMode?: Maybe<Scalars["String"]>;
  fullWeightDuration?: Maybe<Scalars["Uint256"]>;
  gracePeriod?: Maybe<Scalars["Uint256"]>;
  nomineeVettingDuration?: Maybe<Scalars["Uint256"]>;
  proposalThreshold?: Maybe<Scalars["Uint256"]>;
  quorumDenominator?: Maybe<Scalars["Uint256"]>;
  quorumNumerator?: Maybe<Scalars["Uint256"]>;
  quorumVotes?: Maybe<Scalars["Uint256"]>;
  votingDelay?: Maybe<Scalars["Uint256"]>;
  votingPeriod?: Maybe<Scalars["Uint256"]>;
};

export enum GovernorType {
  Aave = "aave",
  Governoralpha = "governoralpha",
  Governorbravo = "governorbravo",
  Hub = "hub",
  Memberelection = "memberelection",
  Nomineeelection = "nomineeelection",
  Nounsfork = "nounsfork",
  Openzeppelingovernor = "openzeppelingovernor",
  Spoke = "spoke",
}

export type GovernorsFiltersInput = {
  excludeSecondary?: InputMaybe<Scalars["Boolean"]>;
  includeInactive?: InputMaybe<Scalars["Boolean"]>;
  organizationId: Scalars["IntID"];
};

export type GovernorsInput = {
  filters: GovernorsFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<GovernorsSortInput>;
};

export enum GovernorsSortBy {
  /** The default sorting method. It sorts by date. */
  Id = "id",
}

export type GovernorsSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: GovernorsSortBy;
};

export type IdentitiesInput = {
  twitter?: InputMaybe<TwitterIdentity>;
};

export type Image = {
  thumbnail?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type Issue = {
  description?: Maybe<Scalars["String"]>;
  id: Scalars["IntID"];
  name?: Maybe<Scalars["String"]>;
  organizationId?: Maybe<Scalars["IntID"]>;
};

export type IssueInput = {
  description: Scalars["String"];
  name: Scalars["String"];
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type IssuesFiltersInput = {
  governanceId?: InputMaybe<Scalars["AccountID"]>;
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type IssuesInput = {
  filters?: InputMaybe<IssuesFiltersInput>;
};

export type JoinOrganizationInput = {
  id: Scalars["IntID"];
  password?: InputMaybe<Scalars["String"]>;
};

export type LinkGovernorInput = {
  id: Scalars["AccountID"];
  organizationId: Scalars["IntID"];
};

export type Member = {
  account: Account;
  id: Scalars["ID"];
  organization: Organization;
  role: OrganizationRole;
};

export type MemberRound = Round & {
  availableVotes: Scalars["Uint256"];
  end: Block;
  fullWeightDuration: Scalars["Uint256"];
  id: Scalars["ProposalID"];
  nominees: Array<Nominee>;
  start: Block;
  status: RoundStatus;
  votesToWeight: Scalars["Uint256"];
};

export type MemberRoundAvailableVotesArgs = {
  address: Scalars["String"];
};

export type MemberRoundNomineesArgs = {
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<CandidateSort>;
};

export type MemberRoundVotesToWeightArgs = {
  votes: Scalars["Uint256"];
};

export type MetaTransaction = {
  action: MetaTransactionAction;
  address: Scalars["Address"];
  createdAt: Scalars["Timestamp"];
  governorId: Scalars["AccountID"];
  id: Scalars["ID"];
  metadata: MetaTransactionActionMetadata;
};

export enum MetaTransactionAction {
  CastVote = "CAST_VOTE",
  Delegate = "DELEGATE",
}

export type MetaTransactionActionMetadata = CastVoteActionMetadata | DelegateActionMetadata;

export type MetaTransactionSort = {
  field?: InputMaybe<MetaTransactionSortField>;
  order?: InputMaybe<SortOrder>;
};

export enum MetaTransactionSortField {
  Created = "CREATED",
}

export type Mutation = {
  addWhitelabelDomain: Scalars["Boolean"];
  analyticsBackfill: Scalars["Boolean"];
  archiveProposal: Scalars["Boolean"];
  /** Creates an API Key for the logged in User */
  createAPIKey: Scalars["String"];
  createCastVoteMetaTransaction: MetaTransaction;
  /** Creates a `ClaimAndDelegateAttempt` with the data called by the user. */
  createClaimAndDelegateAttempt: Scalars["Boolean"];
  createCloudEvent: CloudEvent;
  createDAO: Organization;
  createDelegateMetaTransaction: MetaTransaction;
  /** Creates a `DelegationAttempt` with the user intended to delegate */
  createDelegationAttempt: Scalars["Boolean"];
  createGovernors: Organization;
  createIssue: Scalars["Boolean"];
  createOrganization: Organization;
  createProposal: Proposal;
  createProposalActionAttempt: Scalars["Boolean"];
  /** Much like governors we can add a safe to an existing DAO.  A DAO can have an unlimited amount of `GnosisSafe`s. */
  createSafe: Scalars["Boolean"];
  createSafeV2: Scalars["Boolean"];
  createUnistakerTransaction: Scalars["Boolean"];
  createVoteAttempt: Scalars["Boolean"];
  deleteIssue: Scalars["Boolean"];
  deleteSync: Scalars["Boolean"];
  disableWhitelabelDomain: Scalars["Boolean"];
  ingestOFACAddresses: Scalars["Boolean"];
  /** Adds the authenticated user to the organization. */
  joinOrganization: Scalars["Boolean"];
  linkGovernor: Governor;
  login: Scalars["String"];
  loginAsSafe: Scalars["String"];
  logout: Scalars["Boolean"];
  /** pauseSync, when pause syncing events from a contrat. */
  pauseSync: Scalars["Boolean"];
  registerAsContenderAttempt: Scalars["Boolean"];
  removeAccountENS: Scalars["Boolean"];
  removeAccountTwitter: Scalars["Boolean"];
  /** This mutation is used to remove an organization by its id. It will remove the organization and all its related data. */
  removeOrganization: Scalars["Boolean"];
  removeSuperAdmin: Scalars["Boolean"];
  removeTwitter: Scalars["Boolean"];
  /** Restores the provided proposal draft as the latest proposal version */
  restoreProposalDraft: Scalars["Boolean"];
  /** ResumeSync, resumes syncing an contract. */
  resumeSync: Scalars["Boolean"];
  resync: Scalars["Boolean"];
  setArbitrumProposalExecuted: Scalars["Boolean"];
  /** SyncNewContract, used by admin/developers to try new processors */
  syncNewContract: Scalars["Boolean"];
  /** Unlinks a Safe from it's Organization for linking to other Organizations */
  unlinkGnosisSafe: Scalars["Boolean"];
  /** Updates tally stored `Account` metadata (name, bio, picture, email, identity providers, etc) */
  updateAccount: Scalars["Boolean"];
  /** Updates an Account for a user via their account id */
  updateAccountByID: Scalars["Boolean"];
  updateCandidateProfile: Scalars["Boolean"];
  updateChain: Chain;
  updateFeature: FeatureState;
  updateGovernor: Governor;
  updateOrganization: Organization;
  /** Updates the admins of organization. `remove` should be a list of member IDs. */
  updateOrganizationAdmins: Scalars["Boolean"];
  /** Updates the organization password. */
  updateOrganizationPassword: Scalars["Boolean"];
  /** Updates the voting parameters of organization. */
  updateOrganizationVotingParameters: Scalars["Boolean"];
  updateParametersOZ: Scalars["Boolean"];
  updateProposal: Proposal;
  /** We are able to use updateSafe to change a gnosis safe name. */
  updateSafe: Scalars["Boolean"];
  updateUnistakerTransaction: Scalars["Boolean"];
  upload: File;
  upsertDelegateProfile: DelegateStatement;
};

export type MutationAddWhitelabelDomainArgs = {
  domain: Scalars["String"];
};

export type MutationArchiveProposalArgs = {
  originalId: Scalars["IntID"];
};

export type MutationCreateApiKeyArgs = {
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateCastVoteMetaTransactionArgs = {
  address: Scalars["Address"];
  gasPrice: Scalars["Uint256"];
  governorId: Scalars["AccountID"];
  proposalId: Scalars["ID"];
  support: SupportType;
  transactionId: Scalars["String"];
  validUntil: Scalars["Timestamp"];
};

export type MutationCreateClaimAndDelegateAttemptArgs = {
  delegateeId: Scalars["AccountID"];
  delegatorId: Scalars["AccountID"];
  expiry: Scalars["Uint256"];
  parameterR: Scalars["Bytes32"];
  parameterS: Scalars["Bytes32"];
  parameterV: Scalars["Uint256"];
  proof?: InputMaybe<Array<Scalars["String"]>>;
  tokenId: Scalars["AssetID"];
  txID: Scalars["HashID"];
};

export type MutationCreateCloudEventArgs = {
  cloudEventInput: CloudEventInput;
};

export type MutationCreateDaoArgs = {
  input: CreateDaoInput;
};

export type MutationCreateDelegateMetaTransactionArgs = {
  address: Scalars["Address"];
  delegatee: Scalars["Address"];
  from: Scalars["Address"];
  gasPrice: Scalars["Uint256"];
  governorId: Scalars["AccountID"];
  tokenContractId: Scalars["AssetID"];
  transactionId: Scalars["String"];
  validUntil: Scalars["Timestamp"];
};

export type MutationCreateDelegationAttemptArgs = {
  delegateeId: Scalars["AccountID"];
  delegatorId: Scalars["AccountID"];
  governanceId?: InputMaybe<Scalars["AccountID"]>;
  tokenId?: InputMaybe<Scalars["AssetID"]>;
  txID: Scalars["Bytes32"];
};

export type MutationCreateGovernorsArgs = {
  input: CreateGovernorsInput;
};

export type MutationCreateIssueArgs = {
  input: IssueInput;
};

export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};

export type MutationCreateProposalArgs = {
  input: CreateProposalInput;
};

export type MutationCreateProposalActionAttemptArgs = {
  input: CreateProposalActionAttemptInput;
};

export type MutationCreateSafeArgs = {
  id: Scalars["AccountID"];
  name?: InputMaybe<Scalars["String"]>;
  organization: Scalars["ID"];
};

export type MutationCreateSafeV2Args = {
  input: CreateSafeInput;
};

export type MutationCreateUnistakerTransactionArgs = {
  input: CreateUnistakerTransactionInput;
};

export type MutationCreateVoteAttemptArgs = {
  input: CreateVoteAttemptInput;
};

export type MutationDeleteIssueArgs = {
  issueId: Scalars["IntID"];
};

export type MutationDeleteSyncArgs = {
  accountID: Scalars["AccountID"];
};

export type MutationDisableWhitelabelDomainArgs = {
  domain: Scalars["String"];
};

export type MutationJoinOrganizationArgs = {
  input: JoinOrganizationInput;
};

export type MutationLinkGovernorArgs = {
  input: LinkGovernorInput;
};

export type MutationLoginArgs = {
  message: Scalars["String"];
  signature: Scalars["String"];
};

export type MutationLoginAsSafeArgs = {
  id?: InputMaybe<Scalars["AccountID"]>;
};

export type MutationPauseSyncArgs = {
  id: Scalars["AccountID"];
};

export type MutationRegisterAsContenderAttemptArgs = {
  address: Scalars["String"];
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
  email?: InputMaybe<Scalars["String"]>;
  hash: Scalars["String"];
  statement?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationRemoveAccountEnsArgs = {
  id: Scalars["AccountID"];
};

export type MutationRemoveAccountTwitterArgs = {
  id: Scalars["AccountID"];
};

export type MutationRemoveOrganizationArgs = {
  input: RemoveOrgsInput;
};

export type MutationRemoveSuperAdminArgs = {
  input: RemoveSuperAdminInput;
};

export type MutationRestoreProposalDraftArgs = {
  id: Scalars["IntID"];
};

export type MutationResumeSyncArgs = {
  id: Scalars["AccountID"];
};

export type MutationResyncArgs = {
  input: ResyncInput;
};

export type MutationSetArbitrumProposalExecutedArgs = {
  input: SetArbitrumProposalExecutedInput;
};

export type MutationSyncNewContractArgs = {
  id: Scalars["AccountID"];
  start: Scalars["Int"];
  type: Scalars["String"];
};

export type MutationUnlinkGnosisSafeArgs = {
  id: Scalars["AccountID"];
};

export type MutationUpdateAccountArgs = {
  bio?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  identities?: InputMaybe<IdentitiesInput>;
  name?: InputMaybe<Scalars["String"]>;
  otherLinks?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>;
  picture?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateAccountByIdArgs = {
  bio?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  id: Scalars["AccountID"];
  identities?: InputMaybe<IdentitiesInput>;
  name?: InputMaybe<Scalars["String"]>;
  otherLinks?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>;
  picture?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateCandidateProfileArgs = {
  address: Scalars["String"];
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
  email?: InputMaybe<Scalars["String"]>;
  statement?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateChainArgs = {
  blockExplorerURL?: InputMaybe<Scalars["String"]>;
  id: Scalars["ChainID"];
  rpcURL?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateFeatureArgs = {
  accountID?: InputMaybe<Scalars["AccountID"]>;
  chainID?: InputMaybe<Scalars["ChainID"]>;
  governanceID?: InputMaybe<Scalars["AccountID"]>;
  name: Scalars["String"];
  organizationID?: InputMaybe<Scalars["ID"]>;
  value: Scalars["Boolean"];
};

export type MutationUpdateGovernorArgs = {
  input: UpdateGovernorInput;
};

export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};

export type MutationUpdateOrganizationAdminsArgs = {
  input: OrganizationAdminsInput;
};

export type MutationUpdateOrganizationPasswordArgs = {
  input: OrganizationPasswordInput;
};

export type MutationUpdateOrganizationVotingParametersArgs = {
  input: OrganizationVotingParametersInput;
};

export type MutationUpdateProposalArgs = {
  input: UpdateProposalInput;
};

export type MutationUpdateSafeArgs = {
  id: Scalars["AccountID"];
  name: Scalars["String"];
};

export type MutationUpdateUnistakerTransactionArgs = {
  input: UpdateUnistakerTransactionInput;
};

export type MutationUploadArgs = {
  file: UploadFile;
};

export type MutationUpsertDelegateProfileArgs = {
  input: UpsertDelegateProfileInput;
};

export type NativeCurrency = {
  /** Decimals of the Currency. e.g.: 18 */
  decimals: Scalars["Int"];
  /** Name of the Currency. e.g.: Ether */
  name: Scalars["String"];
  /** Symbol of the Currency. e.g.: ETH */
  symbol: Scalars["String"];
};

/** Union of all node types that are paginated. */
export type Node =
  | Delegate
  | Delegation
  | Governor
  | Member
  | Organization
  | Proposal
  | StakeEarning
  | StakeEvent
  | Vote;

export type NominationRound = Round & {
  availableVotes: Scalars["Uint256"];
  contenderRegistrationStart: Block;
  contenders: Array<Contender>;
  end: Block;
  endNomineeVotingPeriod: Block;
  id: Scalars["ProposalID"];
  start: Block;
  status: RoundStatus;
  threshold?: Maybe<Scalars["Uint256"]>;
  vettingDuration: Scalars["Uint256"];
};

export type NominationRoundAvailableVotesArgs = {
  address: Scalars["String"];
};

export type NominationRoundContendersArgs = {
  filter?: InputMaybe<ContenderFilter>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<CandidateSort>;
};

export type Nominee = Candidate & {
  account: Account;
  accountElectionMeta: AccountElectionMeta;
  id: Scalars["ID"];
  totalVoters: Scalars["Int"];
  totalVotes: Scalars["Uint256"];
  votes: Array<CandidateVote>;
};

export type NomineeVotesArgs = {
  pagination?: InputMaybe<Pagination>;
};

export type NonceOutput = {
  /** Nonce expiration time; this is same as expirationTime in siwe message */
  expirationTime: Scalars["Timestamp"];
  /** Nonce issued time; this is same as issuedAt in siwe message */
  issuedAt: Scalars["Timestamp"];
  nonce: Scalars["String"];
  /** Pass this token as the 'Nonce' header in the login request. This is temporary until we figure out cookie usage */
  nonceToken: Scalars["String"];
};

export enum OrgUxVersion {
  Governor = "governor",
  Tokenless = "tokenless",
}

export type Organization = {
  /** Can only be accessed by a TallyAdmin or Organization Admin */
  adminData?: Maybe<OrganizationAdminData>;
  chainIds: Array<Scalars["ChainID"]>;
  creator?: Maybe<Account>;
  delegatesCount: Scalars["Int"];
  delegatesVotesCount: Scalars["Uint256"];
  features?: Maybe<Array<FeatureState>>;
  governorIds: Array<Scalars["AccountID"]>;
  hasActiveProposals: Scalars["Boolean"];
  id: Scalars["IntID"];
  metadata?: Maybe<OrganizationMetadata>;
  myRole?: Maybe<OrganizationRole>;
  name: Scalars["String"];
  proposalsCount: Scalars["Int"];
  requiresPasswordToJoin: Scalars["Boolean"];
  slug: Scalars["String"];
  /** @deprecated use `tokenOwnersCount` instead */
  tokenHoldersCount: Scalars["Int"];
  tokenIds: Array<Scalars["AssetID"]>;
  tokenOwnersCount: Scalars["Int"];
  /** Organization type, for UX purposes only. */
  uxVersion: OrgUxVersion;
  /** @deprecated use `delegatesCount` instead */
  votersCount: Scalars["Int"];
};

export type OrganizationAdminData = {
  contact?: Maybe<Contact>;
  password?: Maybe<Scalars["String"]>;
};

export type OrganizationAdminsInput = {
  add?: InputMaybe<Array<AddAdminInput>>;
  id: Scalars["IntID"];
  remove?: InputMaybe<Array<Scalars["ID"]>>;
};

export type OrganizationInput = {
  id?: InputMaybe<Scalars["IntID"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type OrganizationIssueInput = {
  description: Scalars["String"];
  name: Scalars["String"];
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type OrganizationIssuesInput = {
  filters?: InputMaybe<IssuesFiltersInput>;
};

export type OrganizationMembersFiltersInput = {
  organizationId: Scalars["IntID"];
  roles?: InputMaybe<Array<OrganizationRole>>;
};

export type OrganizationMembersInput = {
  filters: OrganizationMembersFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<OrganizationMembersSortInput>;
};

export enum OrganizationMembersSortBy {
  Id = "id",
}

export type OrganizationMembersSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: OrganizationMembersSortBy;
};

export type OrganizationMetadata = {
  color?: Maybe<Scalars["String"]>;
  contact?: Maybe<Contact>;
  description?: Maybe<Scalars["String"]>;
  icon?: Maybe<Scalars["String"]>;
  /** Name of this Organization in the Karma API, also if set, it signals to the FE to fetch data from karma */
  karmaName?: Maybe<Scalars["String"]>;
  socials?: Maybe<Socials>;
};

export type OrganizationMetadataInput = {
  color?: InputMaybe<Scalars["String"]>;
  contact?: InputMaybe<ContactInput>;
  description?: InputMaybe<Scalars["String"]>;
  icon?: InputMaybe<Scalars["String"]>;
  socials?: InputMaybe<SocialsInput>;
};

export type OrganizationPasswordInput = {
  id: Scalars["IntID"];
  password: Scalars["String"];
};

export enum OrganizationRole {
  Admin = "ADMIN",
  Member = "MEMBER",
  Superadmin = "SUPERADMIN",
}

export type OrganizationVotingParametersInput = {
  id: Scalars["IntID"];
  proposalThreshold?: InputMaybe<Scalars["Uint256"]>;
  quorum?: InputMaybe<Scalars["Uint256"]>;
  role?: InputMaybe<OrganizationRole>;
  votingPeriod?: InputMaybe<Scalars["Int"]>;
};

export type OrganizationsFiltersInput = {
  address?: InputMaybe<Scalars["Address"]>;
  chainId?: InputMaybe<Scalars["ChainID"]>;
  hasLogo?: InputMaybe<Scalars["Boolean"]>;
  /** Indicates whether the user holds any of the governance tokens associated with the organization. */
  isMember?: InputMaybe<Scalars["Boolean"]>;
  roles?: InputMaybe<Array<OrganizationRole>>;
};

export type OrganizationsInput = {
  filters?: InputMaybe<OrganizationsFiltersInput>;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<OrganizationsSortInput>;
};

export enum OrganizationsSortBy {
  /** Sorts by live proposals and voters as on the Tally explore page. */
  Explore = "explore",
  /** The default sorting method. It sorts by date. */
  Id = "id",
  Name = "name",
  /** Same as explore but does not prioritize live proposals. */
  Popular = "popular",
}

export type OrganizationsSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: OrganizationsSortBy;
};

export type OtherLink = {
  label: Scalars["String"];
  value: Scalars["String"];
};

export type OtherLinkInput = {
  label: Scalars["String"];
  value: Scalars["String"];
};

/** Page metadata including pagination cursors and total count */
export type PageInfo = {
  /**
   * Total number of items across all pages.
   * FYI, this is not yet implemented so the value will always be 0
   */
  count?: Maybe<Scalars["Int"]>;
  /** Cursor of the first item in the page */
  firstCursor?: Maybe<Scalars["String"]>;
  /** Cursor of the last item in the page */
  lastCursor?: Maybe<Scalars["String"]>;
};

/**
 * Input to specify cursor based pagination parameters.
 * Depending on which page is being fetched, between `afterCursor` & `beforeCursor`,
 * only one's value needs to be provided
 */
export type PageInput = {
  /** Cursor to start pagination after to fetch the next page */
  afterCursor?: InputMaybe<Scalars["String"]>;
  /** Cursor to start pagination before to fetch the previous page */
  beforeCursor?: InputMaybe<Scalars["String"]>;
  /**
   * Maximum number of items per page
   * 20 is the hard limit set on the backend
   */
  limit?: InputMaybe<Scalars["Int"]>;
};

/** Wraps a list of nodes and the pagination info */
export type PaginatedOutput = {
  /** List of nodes for the page */
  nodes: Array<Node>;
  /** Pagination information */
  pageInfo: PageInfo;
};

export type Pagination = {
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
};

export type Parameter = {
  name: Scalars["String"];
  type: Scalars["String"];
  value: Scalars["Any"];
  valueDecoded?: Maybe<Array<ValueDecoded>>;
};

export type PriceChecker = {
  feePath: Array<Scalars["Uint256"]>;
  slippage: Scalars["Uint256"];
  tokenPath: Array<Scalars["String"]>;
  /** List of Uniswap pool ids. */
  uniPoolPath?: Maybe<Array<Scalars["String"]>>;
};

export type Proposal = {
  block?: Maybe<Block>;
  chainId: Scalars["ChainID"];
  createdAt: Scalars["Timestamp"];
  /** `Account` that submitted this proposal onchain */
  creator?: Maybe<Account>;
  /** Delegated votes count of a given address on this proposal */
  delegateVotesCount: Scalars["Uint256"];
  /** Last block or timestamp when you can cast a vote */
  end: BlockOrTimestamp;
  /** List of state transitions for this proposal. The last `ProposalEvent` is the current state. */
  events: Array<ProposalEvent>;
  executableCalls?: Maybe<Array<ExecutableCall>>;
  governor: Governor;
  /** Tally ID */
  id: Scalars["IntID"];
  l1ChainId?: Maybe<Scalars["ChainID"]>;
  metadata: ProposalMetadata;
  /** ID onchain */
  onchainId?: Maybe<Scalars["String"]>;
  organization: Organization;
  originalId?: Maybe<Scalars["IntID"]>;
  participationType: ProposalParticipationType;
  /** `Account` that created this proposal offchain */
  proposer?: Maybe<Account>;
  quorum?: Maybe<Scalars["Uint256"]>;
  /** First block when you can cast a vote, also the time when quorum is established */
  start: BlockOrTimestamp;
  status: ProposalStatus;
  /** List of `ChainID`s that this proposal is bridged to and thus votable on */
  votableChains: Array<Scalars["ChainID"]>;
  voteStats?: Maybe<Array<VoteStats>>;
};

export type ProposalDelegateVotesCountArgs = {
  address: Scalars["Address"];
};

export type ProposalParticipationTypeArgs = {
  address: Scalars["Address"];
};

export type ProposalActionAttempt = {
  actor: Account;
  chainId: Scalars["ChainID"];
  proposal: Proposal;
  txHash: Scalars["Hash"];
  type: ProposalActionType;
};

export type ProposalActionAttemptInput = {
  proposalId: Scalars["IntID"];
  type: ProposalActionType;
};

export enum ProposalActionType {
  Cancel = "cancel",
  Execute = "execute",
  Queue = "queue",
}

export type ProposalEvent = {
  block?: Maybe<Block>;
  chainId: Scalars["ChainID"];
  createdAt: Scalars["Timestamp"];
  txHash?: Maybe<Scalars["Hash"]>;
  type: ProposalEventType;
};

export enum ProposalEventType {
  Activated = "activated",
  Callexecuted = "callexecuted",
  Canceled = "canceled",
  Created = "created",
  Crosschainexecuted = "crosschainexecuted",
  Defeated = "defeated",
  Drafted = "drafted",
  Executed = "executed",
  Expired = "expired",
  Extended = "extended",
  Pendingexecution = "pendingexecution",
  Queued = "queued",
  Succeeded = "succeeded",
}

export type ProposalInput = {
  governorId?: InputMaybe<Scalars["AccountID"]>;
  id?: InputMaybe<Scalars["IntID"]>;
  includeArchived?: InputMaybe<Scalars["Boolean"]>;
  isLatest?: InputMaybe<Scalars["Boolean"]>;
  /** this is not unique across governors; so must be used in combination with `governorId` */
  onchainId?: InputMaybe<Scalars["String"]>;
};

export type ProposalMetadata = {
  /** Proposal description onchain */
  description: Scalars["String"];
  discourseURL?: Maybe<Scalars["String"]>;
  /** Time at which a proposal can be executed */
  eta?: Maybe<Scalars["Int"]>;
  ipfsHash?: Maybe<Scalars["String"]>;
  previousEnd?: Maybe<Scalars["Int"]>;
  snapshotURL?: Maybe<Scalars["String"]>;
  timelockId?: Maybe<Scalars["AccountID"]>;
  /** Proposal title: usually first line of description */
  title: Scalars["String"];
  txHash?: Maybe<Scalars["Hash"]>;
};

export enum ProposalParticipationType {
  Notdelegate = "notdelegate",
  Notvoted = "notvoted",
  Unknown = "unknown",
  Votedabstain = "votedabstain",
  Votedagainst = "votedagainst",
  Votedfor = "votedfor",
}

/** Type that describes a security check related to a saved proposal */
export type ProposalSecurityCheck = {
  createdAt: Scalars["Timestamp"];
  /** JSON metadata of the security check */
  metadata: ActionsSecurityCheck;
};

export type ProposalSecurityCheckInput = {
  executableCalls: Array<ExecutableCallInput>;
  governorId: Scalars["AccountID"];
  proposer: Scalars["AccountID"];
  value?: InputMaybe<Scalars["Uint256"]>;
};

export type ProposalStats = {
  /** Total count of active proposals */
  active: Scalars["Int"];
  /** Total count of failed proposals including quorum not reached */
  failed: Scalars["Int"];
  /** Total count of passed proposals */
  passed: Scalars["Int"];
  /** Total count of proposals */
  total: Scalars["Int"];
};

export enum ProposalStatus {
  Active = "active",
  Archived = "archived",
  Callexecuted = "callexecuted",
  Canceled = "canceled",
  Crosschainexecuted = "crosschainexecuted",
  Defeated = "defeated",
  Draft = "draft",
  Executed = "executed",
  Expired = "expired",
  Extended = "extended",
  Pending = "pending",
  Pendingexecution = "pendingexecution",
  Queued = "queued",
  Submitted = "submitted",
  Succeeded = "succeeded",
}

export type ProposalsCreatedCountInput = {
  governorId?: InputMaybe<Scalars["AccountID"]>;
  organizationId?: InputMaybe<Scalars["IntID"]>;
};

export type ProposalsFiltersInput = {
  governorId?: InputMaybe<Scalars["AccountID"]>;
  /** Only drafts can be archived; so, this works ONLY with `isDraft: true` */
  includeArchived?: InputMaybe<Scalars["Boolean"]>;
  isDraft?: InputMaybe<Scalars["Boolean"]>;
  organizationId?: InputMaybe<Scalars["IntID"]>;
  /** Address that created the proposal offchain; in other words, created the draft */
  proposer?: InputMaybe<Scalars["Address"]>;
};

export type ProposalsInput = {
  filters: ProposalsFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<ProposalsSortInput>;
};

export enum ProposalsSortBy {
  /** The default sorting method. It sorts by date. */
  Id = "id",
}

export type ProposalsSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: ProposalsSortBy;
};

export type Query = {
  account: Account;
  accountByEns: Account;
  accountV2: Account;
  accounts: Array<Account>;
  actionSecurityCheck: SingleActionSecurityCheck;
  actionsSecurityCheck: ActionsSecurityCheck;
  address: AddressInfo;
  /** Returns tokens that can be swapped from the governor's treasury via the Tally Swap proposal recipe. */
  availableSwaps: SwapAssets;
  balances: Array<BalanceItem>;
  /** Returns the `Block` including an actual or estimated timestamp given a `BlockID`. */
  block: Block;
  candidateEmails: Array<CandidateExport>;
  chains: Array<Maybe<Chain>>;
  claimAndDelegateAttempt?: Maybe<ClaimAndDelegateAttempt>;
  contender: Contender;
  contractAbi: Array<AbiElement>;
  council: Council;
  councilSlugToId: Scalars["AccountID"];
  councils: Array<Council>;
  /** Returns delegate information by an address for an organization or governor. */
  delegate?: Maybe<Delegate>;
  /** Returns a delegatee of a user, to whom this user has delegated, for a governor */
  delegatee?: Maybe<Delegation>;
  /** Returns a paginated list of delegatees of a user, to whom this user has delegated, that match the provided filters. */
  delegatees: PaginatedOutput;
  /** Returns a paginated list of delegates that match the provided filters. */
  delegates: PaginatedOutput;
  delegationAttempt?: Maybe<DelegationAttempt>;
  /** Returns a paginated list of delegators of a delegate that match the provided filters. */
  delegators: PaginatedOutput;
  election: Election;
  generateAdminToolToken: Scalars["String"];
  /** Returns any `GnosisSafe`'s info given a chain scoped `AccountID`. */
  gnosisSafe: GnosisSafe;
  gnosisSafeTransaction: GnosisSafeTransaction;
  /** Returns a list of multisig tranasctions given a safe `AccountID`.  `Pagniation` defaults to a limit of 20 transactions if no limit is provided.  There are a number of filters and ordering settings we can support, please reach out to discuss. */
  gnosisSafeTransactions: Array<GnosisSafeTransaction>;
  /** This will return a list of `GnosisSafe`s related to a DAO along with `GnosisSafe` info similar to the governances query. */
  gnosisSafes: Array<GnosisSafe>;
  gnosisSafesV2: Array<GnosisSafe>;
  /** Returns governor by ID or slug. */
  governor: Governor;
  /** Returns a paginated list of governors that match the provided filters.  Note: Tally may deactivate governors from time to time. If you wish to include those set `includeInactive` to `true`. */
  governors: PaginatedOutput;
  issues?: Maybe<Array<Maybe<Issue>>>;
  latestForumActivity: ForumActivity;
  me: Account;
  memberRound: MemberRound;
  metaTransactions?: Maybe<Array<MetaTransaction>>;
  nominationRound: NominationRound;
  nominee: Nominee;
  nonce: NonceOutput;
  /** Returns organization by ID or slug. */
  organization: Organization;
  organizationMembers: PaginatedOutput;
  organizationSlugToId: Scalars["IntID"];
  /** Returns a paginated list of organizations that match the provided filters. */
  organizations: PaginatedOutput;
  /** Returns a proposal by ID or onchainId + governorId. Also retruns latest draft version by ID. */
  proposal: Proposal;
  proposalActionAttempt: ProposalActionAttempt;
  proposalSecurityCheck: ProposalSecurityCheck;
  proposalWithVersions: Array<Proposal>;
  /** Returns a paginated list of proposals that match the provided filters. */
  proposals: PaginatedOutput;
  /** Returns a quote for a swap. */
  quoteSwap: SwapQuote;
  searchOrganization: Array<Organization>;
  stakeEarnings: PaginatedOutput;
  stakeEvents: PaginatedOutput;
  stakeStats: StakeStats;
  token: Token;
  /** Returns all token balances of an address for a governor or organization or token */
  tokenBalances: Array<TokenBalance>;
  transactionAttempts: Array<TransactionAttempt>;
  unistakerTransactions: Array<UnistakerTransaction>;
  validateNewGovernor: ValidateNewGovernorOutput;
  voteAttempt?: Maybe<VoteAttempt>;
  /** Returns a paginated list of votes that match the provided filters. */
  votes: PaginatedOutput;
  whitelabelDomains?: Maybe<Array<Scalars["String"]>>;
};

export type QueryAccountArgs = {
  id: Scalars["AccountID"];
};

export type QueryAccountByEnsArgs = {
  ens: Scalars["String"];
};

export type QueryAccountV2Args = {
  id: Scalars["Address"];
};

export type QueryAccountsArgs = {
  addresses?: InputMaybe<Array<Scalars["Address"]>>;
  ids?: InputMaybe<Array<Scalars["AccountID"]>>;
};

export type QueryActionSecurityCheckArgs = {
  input: SingleActionSecurityCheckInput;
};

export type QueryActionsSecurityCheckArgs = {
  input: ProposalSecurityCheckInput;
};

export type QueryAddressArgs = {
  address: Scalars["Address"];
};

export type QueryAvailableSwapsArgs = {
  governorID: Scalars["AccountID"];
};

export type QueryBalancesArgs = {
  accountID: Scalars["AccountID"];
};

export type QueryBlockArgs = {
  id: BlockIdInput;
};

export type QueryCandidateEmailsArgs = {
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
  round: Scalars["Int"];
};

export type QueryClaimAndDelegateAttemptArgs = {
  delegatorId: Scalars["AccountID"];
  tokenId: Scalars["AssetID"];
};

export type QueryContenderArgs = {
  address?: InputMaybe<Scalars["String"]>;
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
  ens?: InputMaybe<Scalars["String"]>;
};

export type QueryContractAbiArgs = {
  id: Scalars["AccountID"];
};

export type QueryCouncilArgs = {
  slug: Scalars["String"];
};

export type QueryCouncilSlugToIdArgs = {
  slug: Scalars["String"];
};

export type QueryCouncilsArgs = {
  tokenId: Scalars["AssetID"];
};

export type QueryDelegateArgs = {
  input: DelegateInput;
};

export type QueryDelegateeArgs = {
  input: DelegationInput;
};

export type QueryDelegateesArgs = {
  input: DelegationsInput;
};

export type QueryDelegatesArgs = {
  input: DelegatesInput;
};

export type QueryDelegationAttemptArgs = {
  delegatorId: Scalars["AccountID"];
  governanceId: Scalars["AccountID"];
};

export type QueryDelegatorsArgs = {
  input: DelegationsInput;
};

export type QueryElectionArgs = {
  councilSlug: Scalars["String"];
  number: Scalars["Int"];
};

export type QueryGnosisSafeArgs = {
  id: Scalars["AccountID"];
};

export type QueryGnosisSafeTransactionArgs = {
  safeTxHashID: Scalars["HashID"];
};

export type QueryGnosisSafeTransactionsArgs = {
  allTransactions?: InputMaybe<Scalars["Boolean"]>;
  gnosisSafeId: Scalars["AccountID"];
  pagination?: InputMaybe<Pagination>;
};

export type QueryGnosisSafesArgs = {
  organizationIds?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryGnosisSafesV2Args = {
  input?: InputMaybe<GnosisSafesInput>;
};

export type QueryGovernorArgs = {
  input: GovernorInput;
};

export type QueryGovernorsArgs = {
  input: GovernorsInput;
};

export type QueryIssuesArgs = {
  input?: InputMaybe<IssuesInput>;
};

export type QueryLatestForumActivityArgs = {
  input: OrganizationInput;
};

export type QueryMemberRoundArgs = {
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
};

export type QueryMetaTransactionsArgs = {
  action: MetaTransactionAction;
  address?: InputMaybe<Scalars["Address"]>;
  governorId?: InputMaybe<Scalars["AccountID"]>;
  pagination?: InputMaybe<Pagination>;
  sort?: InputMaybe<MetaTransactionSort>;
};

export type QueryNominationRoundArgs = {
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
};

export type QueryNomineeArgs = {
  address?: InputMaybe<Scalars["String"]>;
  councilSlug: Scalars["String"];
  electionNumber: Scalars["Int"];
  ens?: InputMaybe<Scalars["String"]>;
};

export type QueryOrganizationArgs = {
  input: OrganizationInput;
};

export type QueryOrganizationMembersArgs = {
  input: OrganizationMembersInput;
};

export type QueryOrganizationSlugToIdArgs = {
  slug: Scalars["String"];
};

export type QueryOrganizationsArgs = {
  input?: InputMaybe<OrganizationsInput>;
};

export type QueryProposalArgs = {
  input: ProposalInput;
};

export type QueryProposalActionAttemptArgs = {
  input: ProposalActionAttemptInput;
};

export type QueryProposalSecurityCheckArgs = {
  proposalId: Scalars["ID"];
};

export type QueryProposalWithVersionsArgs = {
  input: ProposalInput;
};

export type QueryProposalsArgs = {
  input: ProposalsInput;
};

export type QueryQuoteSwapArgs = {
  buy: Scalars["AccountID"];
  governorID: Scalars["AccountID"];
  sell: Scalars["AccountID"];
  sellAmount: Scalars["Uint256"];
};

export type QuerySearchOrganizationArgs = {
  input: SearchOrganizationInput;
};

export type QueryStakeEarningsArgs = {
  input: StakeInput;
};

export type QueryStakeEventsArgs = {
  input: StakeInput;
};

export type QueryStakeStatsArgs = {
  input: StakeInput;
};

export type QueryTokenArgs = {
  input: TokenInput;
};

export type QueryTokenBalancesArgs = {
  input: TokenBalancesInput;
};

export type QueryTransactionAttemptsArgs = {
  input: TransactionAttemptsInput;
};

export type QueryUnistakerTransactionsArgs = {
  input: UnistakerTransactionsInput;
};

export type QueryValidateNewGovernorArgs = {
  input: ValidateNewGovernorInput;
};

export type QueryVoteAttemptArgs = {
  input: VoteAttemptInput;
};

export type QueryVotesArgs = {
  input: VotesInput;
};

export type RecentParticipationStatsInput = {
  governorID: Scalars["AccountID"];
};

export type RemoveOrgsInput = {
  organizationIds: Array<Scalars["IntID"]>;
};

export type RemoveSuperAdminInput = {
  accountId: Scalars["AccountID"];
  organizationId: Scalars["IntID"];
};

export type ResyncInput = {
  governorIds: Array<Scalars["AccountID"]>;
};

export enum Role {
  Admin = "ADMIN",
  User = "USER",
}

export type Round = {
  availableVotes: Scalars["Uint256"];
  end: Block;
  id: Scalars["ProposalID"];
  start: Block;
  status: RoundStatus;
};

export type RoundAvailableVotesArgs = {
  address: Scalars["String"];
};

export enum RoundStatus {
  Active = "ACTIVE",
  Complete = "COMPLETE",
  Executed = "EXECUTED",
  Pending = "PENDING",
}

export type SafeTokenBalance = {
  address?: Maybe<Scalars["String"]>;
  amount: Scalars["String"];
  decimals: Scalars["Int"];
  fiat: Scalars["String"];
  logoURI: Scalars["String"];
  name: Scalars["String"];
  symbol: Scalars["String"];
};

export type SearchOrganizationFiltersInput = {
  chainId?: InputMaybe<Scalars["ChainID"]>;
};

export type SearchOrganizationInput = {
  filters?: InputMaybe<SearchOrganizationFiltersInput>;
  name: Scalars["String"];
};

export type SecurityAnalysisV2 = {
  dataPoints: Array<AnalysisDataPointV2>;
};

export type SetArbitrumProposalExecutedInput = {
  OnchainProposalId: Scalars["String"];
  blockNumber: Scalars["Int"];
  /** unix timestamp in seconds */
  blockTimestamp: Scalars["Int"];
  txHash: Scalars["Hash"];
};

export enum SimulationStatus {
  Failed = "failed",
  Success = "success",
}

/** Security check for a single action */
export type SingleActionSecurityCheck = {
  metadata: SingleActionSecurityCheckMetadata;
  simulation: TransactionSimulationV2;
};

export type SingleActionSecurityCheckInput = {
  executableCall: ExecutableCallInput;
  governorId: Scalars["AccountID"];
  proposer?: InputMaybe<Scalars["AccountID"]>;
  value?: InputMaybe<Scalars["Uint256"]>;
};

/** Metadata for a single action security check */
export type SingleActionSecurityCheckMetadata = {
  contractVerification?: Maybe<ContractVerificationV2>;
  securityAnalysis?: Maybe<SecurityAnalysisV2>;
};

export type Socials = {
  discord?: Maybe<Scalars["String"]>;
  discourse?: Maybe<Scalars["String"]>;
  others?: Maybe<Array<Maybe<OtherLink>>>;
  telegram?: Maybe<Scalars["String"]>;
  twitter?: Maybe<Scalars["String"]>;
  website?: Maybe<Scalars["String"]>;
};

export type SocialsInput = {
  discord?: InputMaybe<Scalars["String"]>;
  discourse?: InputMaybe<Scalars["String"]>;
  others?: InputMaybe<Array<InputMaybe<OtherLinkInput>>>;
  telegram?: InputMaybe<Scalars["String"]>;
  twitter?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export type SpectaQlOption = {
  key: Scalars["String"];
  value: Scalars["String"];
};

export type StakeEarning = {
  amount: Scalars["Uint256"];
  date: Scalars["Date"];
};

export type StakeEvent = {
  amount: Scalars["Uint256"];
  block: Block;
  type: StakeEventType;
};

export enum StakeEventType {
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export type StakeInput = {
  stakedTokenAccountId: Scalars["AccountID"];
  staker: Scalars["Address"];
};

export type StakeStats = {
  estimatedEarningsRate?: Maybe<Scalars["Float"]>;
  totalEarnings: Scalars["Uint256"];
};

/** Vote Choice */
export enum SupportType {
  Abstain = "ABSTAIN",
  Against = "AGAINST",
  For = "FOR",
}

export type SwapAssets = {
  /** List of tokens that can be bought via the Tally Swap proposal recipe. */
  buy: Array<SwapToken>;
  /** List of tokens that can be sold via the Tally Swap proposal recipe. */
  sell: Array<BalanceItem>;
};

export type SwapMetaInput = {
  /** Tally fee */
  fee?: Maybe<Scalars["Uint256"]>;
  /** List of Uniswap pool ids, describing price checker path. */
  uniPoolPath?: Maybe<Array<Scalars["String"]>>;
};

export type SwapOrder = {
  /** Address of the order smart contract. */
  address?: Maybe<Scalars["String"]>;
  /** Buy amount if status is fulfilled. */
  buyAmount?: Maybe<Scalars["Uint256"]>;
  /** CoW order id if status is fulfilled. */
  id?: Maybe<Scalars["String"]>;
  /** Status of the order. */
  status: SwapOrderStatus;
};

export enum SwapOrderStatus {
  Failed = "FAILED",
  Fulfilled = "FULFILLED",
  Pending = "PENDING",
  PendingExecution = "PENDING_EXECUTION",
}

export type SwapQuote = {
  buyAmount: Scalars["Uint256"];
  buyTokenQuoteRate?: Maybe<Scalars["Float"]>;
  feeAmount: Scalars["Uint256"];
  sellAmount: Scalars["Uint256"];
  validTo: Scalars["Timestamp"];
};

export type SwapToken = {
  decimals: Scalars["Int"];
  id: Scalars["AccountID"];
  logo: Scalars["String"];
  name: Scalars["String"];
  symbol: Scalars["String"];
};

/** Source of data: Hexagate. actionsData is the analysis per executable call, and proposerRisk is an opiniated value from Hexagate (e.g. High)  */
export type ThreatAnalysis = {
  actionsData: Array<Maybe<ActionThreatData>>;
  proposerRisk: Scalars["String"];
};

export enum TimeInterval {
  All = "ALL",
  Day = "DAY",
  Hour = "HOUR",
  Month = "MONTH",
  Quarter = "QUARTER",
  Week = "WEEK",
  Year = "YEAR",
}

/** Core type that describes an onchain Token contract */
export type Token = {
  /** Number of decimal places included in `Uint256` values */
  decimals: Scalars["Int"];
  /** Eligibility of an account to claim this token */
  eligibility: Eligibility;
  id: Scalars["AssetID"];
  isBehind: Scalars["Boolean"];
  isIndexing: Scalars["Boolean"];
  /** Last block that Tally has indexed.  Sometimes our indexer needs to catch up.  Our indexer is usually ~1min behind depending on chain so we don't serve data that might later be reorged. */
  lastIndexedBlock: Block;
  /** Onchain name */
  name: Scalars["String"];
  /** supply derived from `Transfer` events */
  supply: Scalars["Uint256"];
  /** Onchain symbol */
  symbol: Scalars["String"];
  /** Token contract type */
  type: TokenType;
};

/** Core type that describes an onchain Token contract */
export type TokenEligibilityArgs = {
  id: Scalars["AccountID"];
};

export type TokenBalance = {
  balance: Scalars["Uint256"];
  token: Token;
};

export type TokenBalancesInput = {
  address: Scalars["Address"];
  governorID?: InputMaybe<Scalars["AccountID"]>;
  organizationID?: InputMaybe<Scalars["IntID"]>;
  tokenId?: InputMaybe<Scalars["AssetID"]>;
};

export type TokenContract = {
  address: Scalars["Address"];
  lastBlock: Scalars["Int"];
  type: TokenType;
};

export type TokenData = {
  data: CovalentData;
  id: Scalars["AccountID"];
};

export type TokenInput = {
  id: Scalars["AssetID"];
};

export enum TokenType {
  Erc20 = "ERC20",
  Erc20Aave = "ERC20AAVE",
  Erc721 = "ERC721",
}

export type Transaction = {
  block: Block;
  id: Scalars["HashID"];
};

export type TransactionAttempt = {
  address: Scalars["Address"];
  chainId: Scalars["ChainID"];
  createdAt: Scalars["Timestamp"];
  id: Scalars["HashID"];
  tokenId?: Maybe<Scalars["AssetID"]>;
  transactionType: TransactionType;
  updatedAt: Scalars["Timestamp"];
};

export type TransactionAttemptsInput = {
  address: Scalars["Address"];
  tokenId?: InputMaybe<Scalars["AssetID"]>;
  transactionType?: InputMaybe<TransactionType>;
};

/** Source of data: Tenderly. Array of simulations used for proposal-level checks */
export type TransactionSimulationArray = {
  simulations: Array<TransactionSimulationV2>;
};

/** V2 */
export type TransactionSimulationV2 = {
  publicURI: Scalars["String"];
  result: Scalars["String"];
};

export enum TransactionType {
  Delegation = "delegation",
}

export type Treasury = {
  tokens: Array<SafeTokenBalance>;
  totalUSDValue: Scalars["String"];
};

export type TwitterIdentity = {
  nonce: Scalars["Int"];
  url: Scalars["String"];
};

export type UnistakerTransaction = {
  address: Scalars["Address"];
  beneficiary?: Maybe<Scalars["Address"]>;
  createdAt: Scalars["Timestamp"];
  delegatee?: Maybe<Scalars["Address"]>;
  depositId?: Maybe<Scalars["String"]>;
  id: Scalars["HashID"];
  newAmount?: Maybe<Scalars["Uint256"]>;
  previousAmount?: Maybe<Scalars["Uint256"]>;
  status: UnistakerTransactionStatus;
  type: UnistakerTransactionType;
  updatedAt: Scalars["Timestamp"];
};

export enum UnistakerTransactionStatus {
  Failed = "failed",
  Indexed = "indexed",
  Pending = "pending",
  Timeout = "timeout",
}

export enum UnistakerTransactionType {
  Alterbeneficiary = "alterbeneficiary",
  Alterdelegatee = "alterdelegatee",
  Delete = "delete",
  Multicall = "multicall",
  Stake = "stake",
  Stakemore = "stakemore",
  Withdraw = "withdraw",
}

export type UnistakerTransactionsInput = {
  accountId: Scalars["AccountID"];
  status?: InputMaybe<UnistakerTransactionStatus>;
};

export type UpdateGovernorInput = {
  id: Scalars["AccountID"];
  metadata?: InputMaybe<GovernorMetadataInput>;
};

export type UpdateOrganizationInput = {
  id: Scalars["IntID"];
  metadata?: InputMaybe<OrganizationMetadataInput>;
  name?: InputMaybe<Scalars["String"]>;
  slug?: InputMaybe<Scalars["String"]>;
};

export type UpdateProposalInput = {
  id: Scalars["IntID"];
  status: ProposalStatus;
  txHash: Scalars["Hash"];
};

export type UpdateUnistakerTransactionInput = {
  id: Scalars["HashID"];
  status: UnistakerTransactionStatus;
};

/** The `UploadFile` type, represents the request for uploading a file with a certain payload. */
export type UploadFile = {
  id: Scalars["Int"];
  upload: Scalars["Upload"];
};

export type UpsertDelegateProfileInput = {
  address?: InputMaybe<Scalars["Address"]>;
  dataSourceURL?: InputMaybe<Scalars["String"]>;
  discourseProfileLink?: InputMaybe<Scalars["String"]>;
  discourseUsername?: InputMaybe<Scalars["String"]>;
  hideDisclaimer?: InputMaybe<Scalars["Boolean"]>;
  isMember?: InputMaybe<Scalars["Boolean"]>;
  isSeekingDelegation?: InputMaybe<Scalars["Boolean"]>;
  issueIds?: InputMaybe<Array<Scalars["IntID"]>>;
  organizationId: Scalars["IntID"];
  statement: Scalars["String"];
  statementSummary?: InputMaybe<Scalars["String"]>;
};

export type ValidateNewGovernorInput = {
  id: Scalars["AccountID"];
};

export type ValidateNewGovernorOutput = {
  startBlock: Scalars["Int"];
  tokenId: Scalars["AssetID"];
  tokenStartBlock: Scalars["Int"];
  type: GovernorType;
};

export type ValueDecoded = {
  data: Scalars["String"];
  dataDecoded?: Maybe<DataDecoded>;
  operation: Scalars["Int"];
  to: Scalars["String"];
  value: Scalars["String"];
};

export type Vote = {
  amount: Scalars["Uint256"];
  block: Block;
  chainId: Scalars["ChainID"];
  id: Scalars["IntID"];
  isBridged?: Maybe<Scalars["Boolean"]>;
  proposal: Proposal;
  reason?: Maybe<Scalars["String"]>;
  txHash: Scalars["Hash"];
  type: VoteType;
  voter: Account;
};

export type VoteAttempt = {
  chainId: Scalars["ChainID"];
  createdAt: Scalars["Timestamp"];
  proposal: Proposal;
  txHash: Scalars["Hash"];
  type: VoteType;
  voter: Account;
};

export type VoteAttemptInput = {
  proposalId: Scalars["IntID"];
  voter: Scalars["Address"];
};

/** Voting Summary per Choice */
export type VoteStats = {
  /** Percent of votes casted for this Choice/`Votetype' */
  percent: Scalars["Float"];
  type: VoteType;
  /** Total number of distinct voters for this Choice/`VoteType` */
  votersCount: Scalars["Int"];
  /** Total votes casted for this Choice/`VoteType` */
  votesCount: Scalars["Uint256"];
};

export enum VoteType {
  Abstain = "abstain",
  Against = "against",
  For = "for",
  Pendingabstain = "pendingabstain",
  Pendingagainst = "pendingagainst",
  Pendingfor = "pendingfor",
}

export type VotesFiltersInput = {
  includePendingVotes?: InputMaybe<Scalars["Boolean"]>;
  proposalId?: InputMaybe<Scalars["IntID"]>;
  proposalIds?: InputMaybe<Array<Scalars["IntID"]>>;
  type?: InputMaybe<VoteType>;
  voter?: InputMaybe<Scalars["Address"]>;
};

export type VotesInput = {
  filters: VotesFiltersInput;
  page?: InputMaybe<PageInput>;
  sort?: InputMaybe<VotesSortInput>;
};

export type VotesSortInput = {
  isDescending: Scalars["Boolean"];
  sortBy: VotesSoryBy;
};

export enum VotesSoryBy {
  Amount = "amount",
  /** The default sorting method. It sorts by date. */
  Id = "id",
}

export type VotingParameters = {
  proposalThreshold?: Maybe<Scalars["Uint256"]>;
  quorum?: Maybe<Scalars["Uint256"]>;
  /** Role user needs to have to update the voting parameters. */
  requiredRole: OrganizationRole;
  /** Voting period defined in s, defaults to 172800 (2 days). */
  votingPeriod: Scalars["Int"];
};

/** Represents a voting power change over an interval or triggered by an event. */
export type VotingPowerChange = {
  /** The `delegate` address whose voting power is changing */
  delegate: Account;
  /** Net change in voting power caused by this event */
  netChange: Scalars["Uint256"];
  /** Voting power after this event or interval */
  newBalance: Scalars["Uint256"];
  /** Voting power prior to this event or interval */
  prevBalance: Scalars["Uint256"];
  /** Timestamp of event or beginging of the interval this voting power change represents */
  timestamp: Scalars["Timestamp"];
  token: Token;
  /** Transaction that triggered this voting change, unset if this is an interval */
  transaction?: Maybe<Transaction>;
};

export type GovernorsQueryVariables = Exact<{
  input: GovernorsInput;
}>;

export type GovernorsQuery = {
  governors: {
    nodes: Array<
      | {
          id: string;
          chainId: string;
          name: string;
          slug: string;
          delegatesCount: number;
          tokenOwnersCount: number;
          proposalStats: { total: number; active: number; failed: number; passed: number };
          organization: { id: any; name: string };
        }
      | {}
    >;
    pageInfo: { firstCursor?: string | null; lastCursor?: string | null; count?: number | null };
  };
};

export const GovernorsDocument = `
    query Governors($input: GovernorsInput!) {
  governors(input: $input) {
    nodes {
      ... on Governor {
        id
        chainId
        name
        slug
        delegatesCount
        proposalStats {
          total
          active
          failed
          passed
        }
        tokenOwnersCount
        organization {
          ... on Organization {
            id
            name
          }
        }
      }
    }
    pageInfo {
      firstCursor
      lastCursor
      count
    }
  }
}
    `;
export const useGovernorsQuery = <TData = GovernorsQuery, TError = Error>(
  variables: GovernorsQueryVariables,
  options?: UseQueryOptions<GovernorsQuery, TError, TData>,
) =>
  useQuery<GovernorsQuery, TError, TData>(
    ["Governors", variables],
    useGraphQLCodegen<GovernorsQuery, GovernorsQueryVariables>(GovernorsDocument).bind(null, variables),
    options,
  );
