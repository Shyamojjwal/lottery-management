/**
 * *Checking uploaded image size and extension validation
 *
 * Example:
 * imagevalidation($event)
 *
 * @param event javascript file change event
 * @date 04 May 2021
 * @developer Rahul Kundu
 * @returns validation error | null
 */
export function imagevalidation(
	event: any,
	filesize: number,
	filesiseType: 'kb' | 'mb',
	fileTypes: string[]
) {
	let validationInfo: any = null;
	filesize = filesize || 1;
	if (event.target.files.length > 0) {
		// Getting list of files
		let files: Array<any> = [];
		files = event.target.files;

		// Looping through the list of files
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const _fileName = file.name; // file name
			const _fileSize = file.size; // file size
			const _fileTypes = fileTypes; // preferred extensions
			const _sizeInMB = file.size / (1024 * 1024);
			const _sizeInKB = file.size / 1024;
			const _fileExtension = _fileName
				.split('.')
				[_fileName.split('.').length - 1].toLowerCase(); // file extension

			const _isMatchedExt: boolean =
				_fileTypes.indexOf(_fileExtension) > -1;
			const _isSizeExceeds: boolean =
				filesiseType === 'mb'
					? _sizeInMB > filesize
					: _sizeInKB > filesize;

			// OR together the accepted extensions and NOT it. Then OR the size cond.
			if (!_isMatchedExt || _isSizeExceeds) {
				/**
				 * !avoid this due to Object Literal Shorthand Syntax
				 * ! _fileName: _fileName to _fileName
				 * !_fileSize: _fileSize to _fileSize
				 * *This rule enforces the use of the shorthand syntax
				 */
				validationInfo = {
					_fileName,
					_fileSize,
					_isMatchedExt,
					_isSizeExceeds
				};
				return validationInfo;
			} else {
				return null;
			}
		}
	} else {
		return null;
	}
}
