function changeGuide() {
    
    const dropdown = document.getElementById("dropdown");
    const selectedValue = dropdown.value;

    document.getElementById("caster").style.display = "none";
    document.getElementById("phys").style.display = "none";
    document.getElementById("healer").style.display = "none";
    document.getElementById("tank").style.display = "none";
    document.getElementById("caster").style.display = "none";

    if (selectedValue === "caster") {
        document.getElementById("caster").style.display = "block";
    } else if (selectedValue === "phys") {
        document.getElementById("phys").style.display = "block";
    } else if (selectedValue === "healer") {
        document.getElementById("healer").style.display = "block";
    } else if (selectedValue === "tank") {
        document.getElementById("tank").style.display = "block";
    } else if (selectedValue === "melee") {
        document.getElementById("melee").style.display = "block";
    }
}