// import { Component, AfterViewInit, ViewChild, ElementRef, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
// import { CommonModule } from "@angular/common";
// declare var Blockly: any;
//
// @Component({
//   selector: 'wsm-blockly',
//   template: `
//     <div id="blocklyDiv" style="height: 440px; width: 1000px;"></div>
//     <xml id="toolbox" #toolbox style="display: none">
//       <category name="Условия">
//         <block type="controls_if"></block>
//         <block type="controls_whileUntil"></block>
//         <block type="controls_for"></block>
//         <block type="controls_repeat_ext"></block>
//       </category>
//       <category name="Логика">
//         <block type="logic_compare"></block>
//       </category>
//       <category name="Математические операции">
//         <block type="math_number"></block>
//         <block type="math_arithmetic"></block>
//       </category>
//       <category name="Текст">
//         <block type="text"></block>
//         <block type="text_print"></block>
//       </category>
//     </xml>
//   `
// })
// export class BlocklyComponent implements AfterViewInit {
//   workspace: any;
//   code: any;
//   @ViewChild('toolbox') toolbox: ElementRef;
//
//   public ngAfterViewInit(): void {
//     this.workspace = Blockly.inject('blocklyDiv',
//       {toolbox: this.toolbox.nativeElement});
//   }
//
//   public convertBlocksToJS() {
//     this.code = Blockly.JavaScript.workspaceToCode(this.workspace);
//     return this.code;
//   }
//
//   public convertCodeToBlocks(code: any) {
//     this.code = code;
//   }
// }
//
// @NgModule({
//   imports: [CommonModule],
//   exports: [BlocklyComponent],
//   declarations: [BlocklyComponent],
//   schemas: [NO_ERRORS_SCHEMA],
// })
// export class BlocklyModule {
//
// }
