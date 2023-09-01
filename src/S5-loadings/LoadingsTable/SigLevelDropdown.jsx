import React from "react";
import S5DataSlice from "../../State/S5DataSlice";

const SigLevelDropdown = (props) => {
  const { setUserSelectedSigLevel, bipolarDisabled, setAutoflagButtonColor } =
    S5DataSlice();

  const handleChange = (event) => {
    setUserSelectedSigLevel(event.target.value);
    setAutoflagButtonColor("bg-orange-300");
    props.clearAllCheckboxes();
  };

  return (
    <select
      className="select select-bordered rounded-md w-[125px] font-bold border border-gray-400"
      onChange={handleChange}
      disabled={bipolarDisabled}
      defaultValue="1.96"
    >
      <option key="99.9" value={3.291}>
        P &lt; 0.001
      </option>
      <option key="99.5" value={2.807}>
        P &lt; 0.0005
      </option>
      <option key="99" value={2.575}>
        P &lt; 0.01
      </option>
      <option key="95" value={1.96}>
        P &lt; 0.05
      </option>
      <option key="90" value={1.645}>
        P &lt; 0.1
      </option>
      <option key="85" value={1.44}>
        P &lt; 0.15
      </option>
      <option key="80" value={1.28}>
        P &lt; 0.2
      </option>
      <option key="Com" value={"majority"}>
        Maj. Com. Var.
      </option>
    </select>
  );
};

export default SigLevelDropdown;

/*
'Significance Threshold'
https://www.slideshare.net/zoubamohamed/table-values

99.99 = 3.891
99.9 = 3.291
99 = 2.575
95 = 1.96
90 = 1.645
85 = 1.44
80 = 1.28

98 = 2.33


  <Dropdown placeholder={ "?" } defaultValue={ 7 }  openOnFocus={ true } button simple item options={ options }

pqmethod = loading 'significant at p<.05'


.67	1.28	1.65	1.96	2.33	2.58	2.81	3.10	3.30	3.49	3.73	3.91


<div role="listbox" aria-expanded="false" class="ui button item simple dropdown" tabindex="0" style="border: 1px solid black; height: 50px;"><div class="text" role="alert" aria-live="polite" aria-atomic="true">P &lt; 0.05</div><i aria-hidden="true" class="dropdown icon"></i><div class="menu transition"><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.0001</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.0005</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.001</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.005</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.01</span></div><div role="option" aria-checked="true" aria-selected="true" class="active selected item" style="pointer-events: all;"><span class="text">P &lt; 0.05</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.1</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.15</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">P &lt; 0.2</span></div><div role="option" aria-checked="false" aria-selected="false" class="item" style="pointer-events: all;"><span class="text">Majority of Common Variance</span></div></div></div>

*/
