import Accessor from "esri/core/Accessor";
import { property, subclass } from "esri/core/accessorSupport/decorators";
import { EffectValueType, LayerEffectID, LayerEffectProperties } from "./interfaces";
import { getEffectValueTypes } from "./layerFXUtils";

@subclass("esri.demo.LayerEffect")
class LayerEffect extends Accessor {
  // ----
  // Lifecycle
  // ---
  
  constructor(props?: LayerEffectProperties){
    super(props);
  }
  @property()
  enabled = false;

  @property()
  id: LayerEffectID = null;

  @property()
  values: number[] = null;

  @property()
    readonly = false;

  get valueTypes(): EffectValueType[]{
    return getEffectValueTypes(this.id);

  @property({
    readOnly = true
  })
  get statement(): string {
    return this.getEffectTemplate(this.id, this.values)
  }
  getEffectTemplate(effectId: LayerEffectID, value: number[]):string {
    const statement = this.valueTypes
      .filter((this.valueType, index) => typeof value[index]=== "number"))
  }
  }


}

export = LayerEffect;
