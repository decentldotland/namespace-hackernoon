export async function handle(state, action) {
  const input = action.input;

  if (input.function === "mint") {
    const { caller, sig } = input;

    const encodedMessage = btoa(`hackernoon::${state.counter}`);
    await _moleculeSignatureVerification(caller, encodedMessage, sig);
    state.counter += 1;
    const profile = await _resolveHackernoonAddr(caller);
    ContractAssert(!(profile["uid"] in state.users), "ERROR_USER_EXISTING");

    state.users[profile["uid"]] = {
      eoa: caller,
      handle: `${profile.handle}.hackernoon`,
    };

    return { state };
  }

  if (input.function === "unlink") {
    const { caller, sig } = input;

    const encodedMessage = btoa(`hackernoon::${state.counter}`);
    await _moleculeSignatureVerification(caller, encodedMessage, sig);
    state.counter += 1;
    const profile = await _resolveHackernoonAddr(caller);
    const uid = profile["uid"]
    ContractAssert(uid in state.users, "ERROR_USER_NOT_EXISTING");

    delete state.users[uid];

    return { state };
  }

  async function _moleculeSignatureVerification(caller, message, signature) {
    try {
      ContractAssert(
        !state.signatures.includes(signature),
        "ERROR_SIGNATURE_ALREADY_USED",
      );

      const isValid = await EXM.deterministicFetch(
        `${state.molecule_endpoints.evm}/signer/${caller}/${message}/${signature}`,
      );
      ContractAssert(isValid.asJSON()?.result, "ERROR_UNAUTHORIZED_CALLER");
      state.signatures.push(signature);
    } catch (error) {
      throw new ContractError("ERROR_MOLECULE.SH_CONNECTION");
    }
  }

  async function _resolveHackernoonAddr(address) {
    try {
      const profile = (
        await EXM.deterministicFetch(
          `${state.molecule_endpoints.hackernoon}/resolve/${address}`,
        )
      )?.asJSON();
      return profile;
    } catch (error) {
      throw new ContractError("ERROR_MOLEXT1_CONNECTION");
    }
  }
}
