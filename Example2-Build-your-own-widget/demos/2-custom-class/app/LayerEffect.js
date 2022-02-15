define(["require", "exports", "tslib", "esri/core/Accessor", "esri/core/accessorSupport/decorators", "./layerFXUtils"], function (require, exports, tslib_1, Accessor_1, decorators_1, layerFXUtils_1) {
    "use strict";
    Accessor_1 = (0, tslib_1.__importDefault)(Accessor_1);
    var LayerEffect = /** @class */ (function (_super) {
        (0, tslib_1.__extends)(LayerEffect, _super);
        // ----
        // Lifecycle
        // ---
        function LayerEffect(props) {
            var _this = _super.call(this, props) || this;
            _this.enabled = false;
            _this.id = null;
            _this.values = null;
            _this.readonly = false;
            return _this;
        }
        Object.defineProperty(LayerEffect.prototype, "valueTypes", {
            get: function () {
                return (0, layerFXUtils_1.getEffectValueTypes)(this.id);
                get;
                statement();
                string;
                {
                    return this.getEffectTemplate(this.id, this.values);
                }
                getEffectTemplate(effectId, LayerEffectID, value, number[]);
                string;
                {
                    var statement = this.valueTypes
                        .filter((this.valueType, index));
                    typeof value[index] === "number";
                }
            },
            enumerable: false,
            configurable: true
        });
        (0, tslib_1.__decorate)([
            (0, decorators_1.property)()
        ], LayerEffect.prototype, "enabled", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.property)()
        ], LayerEffect.prototype, "id", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.property)()
        ], LayerEffect.prototype, "values", void 0);
        (0, tslib_1.__decorate)([
            (0, decorators_1.property)()
        ], LayerEffect.prototype, "readonly", void 0);
        LayerEffect = (0, tslib_1.__decorate)([
            (0, decorators_1.subclass)("esri.demo.LayerEffect")
        ], LayerEffect);
        return LayerEffect;
    }(Accessor_1.default));
    return LayerEffect;
});
//# sourceMappingURL=LayerEffect.js.map