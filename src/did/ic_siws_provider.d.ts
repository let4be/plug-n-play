import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Address = string;
export type PublicKey = Uint8Array;
export type SessionKey = PublicKey;
export type Timestamp = bigint;
export type SiwsSignature = string;
export type CanisterPublicKey = PublicKey;

export interface Delegation {
  'pubkey' : PublicKey,
  'targets' : [] | [Array<Principal>], // Array of Principal based on IDL def
  'expiration' : Timestamp,
}
export interface SignedDelegation {
  'signature' : Uint8Array,
  'delegation' : Delegation,
}
export type GetDelegationResponse = { 'Ok' : SignedDelegation } |
  { 'Err' : string };
export interface LoginDetails {
  'user_canister_pubkey' : CanisterPublicKey,
  'expiration' : Timestamp,
}
export type LoginResponse = { 'Ok' : LoginDetails } |
  { 'Err' : string };
export interface SiwsMessage {
  'uri' : string,
  'issued_at' : bigint,
  'domain' : string,
  'statement' : string, // Assuming statement is always present or empty string based on formatSiwsMessage
  'version' : number, // Nat32 becomes number
  'chain_id' : string,
  'address' : Address,
  'nonce' : string,
  'expiration_time' : bigint,
}
export type PrepareLoginResponse = { 'Ok' : SiwsMessage } |
  { 'Err' : string };
export type GetAddressResponse = { 'Ok' : Address } |
  { 'Err' : string };
// Using Uint8Array for Principal representation in actor calls based on IDL
export type GetPrincipalResponse = { 'Ok' : Uint8Array } |
  { 'Err' : string };

// Define the service interface
export interface _SERVICE {
  'get_address' : ActorMethod<[Uint8Array], GetAddressResponse>,
  'get_caller_address' : ActorMethod<[], GetAddressResponse>,
  'get_principal' : ActorMethod<[Address], GetPrincipalResponse>,
  'siws_get_delegation' : ActorMethod<[Address, SessionKey, Timestamp], GetDelegationResponse>,
  'siws_login' : ActorMethod<[SiwsSignature, Address, SessionKey], LoginResponse>,
  'siws_prepare_login' : ActorMethod<[Address], PrepareLoginResponse>,
} 