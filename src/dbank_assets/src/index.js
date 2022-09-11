import { dbank } from "../../declarations/dbank";

const orgFloor = (value, base) => {
  return Math.floor(value * base) / base;
};

const checkBalance = async () => {
  const currentAmount = await dbank.checkBalance();
  return orgFloor(currentAmount, 100);
};

window.addEventListener("load", async () => {
  document.getElementById("value").innerText = await checkBalance();
});

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("#submit-btn");
  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawalAmount = parseFloat(
    document.getElementById("withdrawal-amount").value
  );

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await dbank.topUp(inputAmount);
  }
  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await dbank.withDraw(withdrawalAmount);
  }
  await dbank.compound();
  document.getElementById("value").innerText = await checkBalance();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");
});
