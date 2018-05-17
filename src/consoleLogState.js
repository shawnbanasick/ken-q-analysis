import store from "./store";

export const consoleLogState = () => {
  // let log = store.getState();

  // console.log(JSON.stringify(store.outputButtonsArray));
  console.log(JSON.stringify(store, null, 2));


  // console.dir(store, {
  //   depth: null,
  //   colors: true
  // });

// console.debug("%o", log);
};
